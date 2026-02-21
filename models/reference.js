const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports =
  mongoose.models.Reference || mongoose.model("Reference", referenceSchema);