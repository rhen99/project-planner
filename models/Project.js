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
  deadline: {
    type: String,
    required: true,
  },
  creator_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
