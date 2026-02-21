const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.models.Service || mongoose.model("Service", serviceSchema);