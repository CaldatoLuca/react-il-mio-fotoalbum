const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../utils/auth");
const AuthError = require("../exceptions/authError");
const { hashPassword, comparePassword } = require("../utils/password");

const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  const data = {
    email,
    password: await hashPassword(password),
    image: `${req.file.filename}`,
    name,
    role: "USER",
  };

  try {
    const user = await prisma.user.create({ data });
    const token = auth.generateToken(user);

    res.status(200).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (e) {
    return next(new AuthError(e.message, 500));
  }
};

const login = (req, res, next) => {
  res.json("login");
};
module.exports = {
  register,
  login,
};
