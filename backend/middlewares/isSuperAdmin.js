const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const AuthError = require("../exceptions/authError");

const isSuperAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user.role !== "SUPERADMIN") {
      return next(
        new AuthError(`You are not authorized to perform this action`, 401)
      );
    }

    next();
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

module.exports = isSuperAdmin;
