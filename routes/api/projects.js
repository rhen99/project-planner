const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const Project = require("../../models/Project");

// @route GET api/projects/
// @desc Get all your projects
// @access Private (for now)

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @route POST api/projects/create
// @desc Create new project
// @access Public (for now)

router.post("/create", async (req, res) => {
  const { name, description, steps, deadline } = req.body;

  try {
    const newProject = await new Project({
      name,
      description,
      deadline,
      steps,
      creator_id: uuid.v4(),
    });
    await newProject.save();

    res.json({
      msg: "Created Successfully",
      project: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});
router.put("/:id&:step", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const steps = project.steps;
    // steps[req.params.step].completed = !steps[req.params.step].completed;

    steps.forEach((step) => {
      console.log(step.completed == false);
    });

    // await project.save();

    res.json({
      msg: "Finished a step.",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
