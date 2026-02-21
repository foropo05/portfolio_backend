const Project = require("../models/project");
const createError = require("http-errors");

const toClient = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

exports.add = async (req, res, next) => {
  try {
    const created = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toClient(created),
    });
  } catch (e) {
    next(e);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const list = await Project.find();
    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (e) {
    next(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await Project.findById(req.params.id);
    if (!doc) return next(createError(404, "Project not found"));
    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: toClient(doc),
    });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return next(createError(404, "Project not found"));
    res.json({ success: true, message: "Project updated successfully." });
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Project not found"));
    res.json({ success: true, message: "Project deleted successfully." });
  } catch (e) {
    next(e);
  }
};