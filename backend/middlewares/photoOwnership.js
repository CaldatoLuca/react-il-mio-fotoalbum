const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const AuthError = require("../exceptions/authError");
const deleteImage = require("../utils/deleteImage");

const postOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const photo = await prisma.photo.findUnique({
      where: { slug: req.params.slug },
      include: {
        user: { select: { name: true } },
      },
    });

    if (photo.userId !== userId) {
      deleteImage(req.file.filename, "photos");
      return next(
        new AuthError(`You are not authorized to perform this action`, 401)
      );
    }

    next();
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
};

module.exports = postOwnership;
