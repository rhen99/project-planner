const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route api/user/register
// @desc Create a user.
// @access Public

router.post("/register", async (req, res) => {});

// @route api/user/login
// @desc Authenticate user
// @access Public

router.post("/login", async (req, res) => {});
// @route api/user
// @desc Get the user.
// @access Private

router.get("/", async (req, res) => {});

module.exports = router;
