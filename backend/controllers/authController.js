const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../utils/auth");
const AuthError = require("../exceptions/authError");
const { hashPassword, comparePassword } = require("../utils/password");

const register = (req, res, next) => {
  res.json("register");
};

const login = (req, res, next) => {
  res.json("login");
};
module.exports = {
  register,
  login,
};
