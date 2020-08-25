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
    projects.forEach((project) => {
      if (new Date(project.deadline).getTime() - Date.now() <= 0) {
        project.status = "Failed";
        project.save();
      }
    });
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
  const { short_description } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    const steps = project.steps;

    if (!short_description)
      return res.status(400).json({
        msg: "Please describe what you did in this step.",
      });

    steps[req.params.step].completed =
      steps[req.params.step].completed === 0 ? 1 : 0;

    steps[req.params.step].short_description = short_description;

    const progress = steps
      .filter((step) => step.completed !== 0)
      .map(() => 100 / steps.length)
      .reduce((acc, curr) => acc + curr, 0);

    project.progress = progress;
    await project.save();

    res.json({
      msg: "Finished a step.",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
