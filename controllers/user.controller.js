const User = require("../models/user");
const createError = require("http-errors");

const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST /api/users
exports.add = async (req, res, next) => {
  try {
    // Ensure created/updated exist (if model doesn't auto-set)
    const payload = {
      ...req.body,
      created: req.body.created || new Date(),
      updated: req.body.updated || new Date(),
    };

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

    const updatedUser = await User.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updatedUser) return next(createError(404, "User not found"));

    res.json({
      success: true,
      message: "User updated successfully.",
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