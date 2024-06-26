const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");
const uniqueSlug = require("../utils/uniqueSlug");
const deleteImage = require("../utils/deleteImage");

const store = async (req, res, next) => {
  let { title, description, visible, categories } = req.body;

  const user = req.user;

  const slug = await uniqueSlug(title);

  const data = {
    title,
    slug,
    description: description ? description : null,
    image: `${req.file.filename}`,
    visible,
    categories: {
      connect: categories.map((c) => ({ id: +c })),
    },
    user: {
      connect: { id: user.id },
    },
  };

  try {
    const photo = await prisma.photo.create({ data });

    res.status(200).json({
      message: "Photo created successfully",
      photo,
    });
  } catch (e) {
    deleteImage(req.file.filename, "photos");
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  store,
};
