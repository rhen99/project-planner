const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  steps: [
    {
      step_name: {
        type: String,
        required: true,
      },
      completed: {
        type: Number,
        required: true,
        default: 0,
      },
      short_description: {
        type: String,
        default: null,
      },
      date: {
        type: Date,
        default: null,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  progress: {
    type: Number,
    default: 0,
  },
  creator_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "On Going",
  },
});

module.exports = mongoose.model("Project", projectSchema);
