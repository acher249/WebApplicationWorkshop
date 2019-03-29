const mongoose = require("mongoose");

// schema
const circleSchema = new mongoose.Schema({
  diameter: Number,
  perimeter: Number
});

module.exports = mongoose.model("Circle", circleSchema);
