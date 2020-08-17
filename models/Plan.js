const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  steps: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  deadline: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Plan", planSchema);
