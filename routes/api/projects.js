const express = require("express");

const router = express.Router();
const auth = require("../../middleware/auth");
const Project = require("../../models/Project");

// @route GET api/projects/
// @desc Get all your projects
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ creator_id: req.user.id });
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
// @access Private

router.post("/create", auth, async (req, res) => {
  const { name, description, steps } = req.body;
  if (!name || !steps)
    return res.status(400).json({
      msg: "Please fill in all required fields.",
    });

  if (steps.length < 1)
    return res.status(400).json({
      msg: "Please enter your steps",
    });

  try {
    const newProject = await new Project({
      name,
      description,
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

// @route PUT api/projects/:id&:step
// @desc Update a project.
// @access Private

router.put("/:id&:step", auth, async (req, res) => {
  const { short_description } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    const steps = project.steps;

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
            project,
          }
        : {
            msg: "Step Undone",
            project,
          }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Server Error",
    });
  }
});

// @route DELETE api/projects/:id
// @desc Delete a project.
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.json({ msg: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
