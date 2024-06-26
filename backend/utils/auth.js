const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, { expiresIn: "8h" });

module.exports = {
  generateToken,
};
