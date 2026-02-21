const Reference = require("../models/reference");
const createError = require("http-errors");

const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

// POST /api/references
exports.add = async (req, res, next) => {
  try {
    const payload = {
      firstname: req.body.firstname ?? req.body.firstName,
      lastname: req.body.lastname ?? req.body.lastName,
      email: req.body.email
    };

    const created = await Reference.create(payload);

    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toClient(created)
    });
  } catch (e) {
    next(e);
  }
};

// GET /api/references
exports.getAll = async (req, res, next) => {
  try {
    const list = await Reference.find();
    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: list.map(toClient)
    });
  } catch (e) {
    next(e);
  }
};

// GET /api/references/:id
exports.getById = async (req, res, next) => {
  try {
    const doc = await Reference.findById(req.params.id);
    if (!doc) return next(createError(404, "Reference not found"));

    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: toClient(doc)
    });
  } catch (e) {
    next(e);
  }
};

// PUT /api/references/:id
exports.update = async (req, res, next) => {
  try {
    const payload = {
      firstname: req.body.firstname ?? req.body.firstName,
      lastname: req.body.lastname ?? req.body.lastName,
      email: req.body.email
    };

    const updated = await Reference.findByIdAndUpdate(req.params.id, payload, { new: true });
    if (!updated) return next(createError(404, "Reference not found"));

    res.json({ success: true, message: "Reference updated successfully." });
  } catch (e) {
    next(e);
  }
};

// DELETE /api/references/:id
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Reference not found"));

    res.json({ success: true, message: "Reference deleted successfully." });
  } catch (e) {
    next(e);
  }
};