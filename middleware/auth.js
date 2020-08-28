const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({
      msg: "No token, authorization denied.",
    });
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      msg: "Token is not valid.",
    });
  }
}
module.exports = auth;
