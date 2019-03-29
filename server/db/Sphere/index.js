const mongoose = require("mongoose");

// schema
const sphereSchema = new mongoose.Schema({
  origin: Object,
  volume: Number
});

module.exports = mongoose.model("Sphere", sphereSchema);
