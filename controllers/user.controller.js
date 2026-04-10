const User = require("../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  delete obj.password; // never send password back
  return obj;
};

// POST /api/users/signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, "Name, email, and password are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    const createdUser = await User.create({
      name,
      email,
      password,
      created: new Date(),
      updated: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully.",
      data: toClient(createdUser),
    });
  } catch (e) {
    next(e);
  }
};

// POST /api/users/signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "Invalid email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(400, "Invalid email or password"));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "User signed in successfully.",
      token,
      data: toClient(user),
    });
  } catch (e) {
    next(e);
  }
};

// POST /api/users
exports.add = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      created: req.body.created || new Date(),
      updated: req.body.updated || new Date(),
    };

    // hash password if one is provided
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const createdUser = await User.create(payload);

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toClient(createdUser),
    });
  } catch (e) {
    next(e);
  }
};

// GET /api/users
exports.getAll = async (req, res, next) => {
  try {
    const list = await User.find();
    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (e) {
    next(e);
  }
};

// GET /api/users/:id
exports.getById = async (req, res, next) => {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: toClient(doc),
    });
  } catch (e) {
    next(e);
  }
};

// PUT /api/users/:id
exports.update = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      updated: new Date(),
    };

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User updated successfully.",
      data: toClient(updatedUser),
    });
  } catch (e) {
    next(e);
  }
};

// DELETE /api/users/:id
exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (e) {
    next(e);
  }
};