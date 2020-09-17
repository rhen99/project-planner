const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const Project = require("../../models/Project");

// @route GET api/projects/
// @desc Get all your projects
// @access Private (for now)

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ creator_id: req.user.id });
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

router.post("/create", auth, async (req, res) => {
  const { name, description, steps, deadline } = req.body;
  if (!name || !steps || !deadline)
    return res.status(400).json({
      msg: "Please fill in all required fields.",
    });

  if (new Date(deadline).getTime() - Date.now() <= 0)
    return res.status(400).json({
      msg: "Please enter a proper deadline",
    });
  if (steps.length < 1)
    return res.status(400).json({
      msg: "Please enter your steps",
    });

  try {
    const newProject = await new Project({
      name,
      description,
      deadline,
      steps,
      creator_id: req.user.id,
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
router.put("/:id&:step", auth, async (req, res) => {
  const { short_description } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    const steps = project.steps;
    if (new Date(project.deadline).getTime() - Date.now() <= 0) {
      return res.status(409).json({
        msg: "Project already reached the deadline.",
      });
    } else {
      if (steps[req.params.step].completed == 0) {
        if (!short_description)
          return res.status(400).json({
            msg: "Please describe what you did in this step.",
          });

        steps[req.params.step].completed = 1;

        steps[req.params.step].short_description = short_description;

        steps[req.params.step].date = Date.now();
      } else {
        steps[req.params.step].completed = 0;

        steps[req.params.step].short_description = null;

        steps[req.params.step].date = null;
      }
    }

    const progress = steps
      .filter((step) => step.completed !== 0)
      .map(() => 100 / steps.length)
      .reduce((acc, curr) => acc + curr, 0);

    project.progress = progress;
    if (project.progress >= 100) {
      project.status = "Success";
    }
    await project.save();
    res.json(
      steps[req.params.step].completed == 1
        ? {
            msg: "Step done",
          }
        : {
            msg: "Step Undone",
          }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;
