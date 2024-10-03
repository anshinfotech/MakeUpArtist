const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  timeDuration: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
