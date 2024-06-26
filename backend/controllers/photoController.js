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

const index = async (req, res, next) => {
  const { visible, filterString, page = 1, limit = 50 } = req.query;
  const where = {};

  if (visible === "true") {
    where.visible = true;
  } else if (visible === "false") {
    where.visible = false;
  }

  if (filterString) {
    where.OR = [
      {
        title: {
          contains: filterString,
        },
      },
      {
        description: {
          contains: filterString,
        },
      },
    ];
  }

  const offset = (page - 1) * limit;
  const totalItems = await prisma.photo.count({ where });
  const totalPages = Math.ceil(totalItems / limit);

  if (totalItems === 0) {
    return next(new CustomError("No photos found", 400));
  }

  if (page > totalPages) {
    return next(new CustomError("The requested page does not exist", 400));
  }

  try {
    const photos = await prisma.photo.findMany({
      where,
      include: {
        categories: { select: { id: true, name: true } },
        user: { select: { name: true, image: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${photos.length} Photos found`,
      page: page,
      totalPages,
      photos,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const show = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { slug: slug },
      include: {
        categories: { select: { id: true, name: true } },
        user: { select: { name: true } },
      },
    });

    res.status(200).json({
      message: "Photo found",
      photo,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const update = async (req, res, next) => {
  const { slug } = req.params;
  let { title, description, visible, categories } = req.body;

  const user = req.user;

  const newSlug = await uniqueSlug(title);

  const photo = await prisma.photo.findUnique({
    where: { slug: slug },
  });

  if (req.file) {
    deleteImage(photo.image, "photos");
  }

  const data = {
    title,
    slug: newSlug,
    description,
    image: req.file ? `${req.file.filename}` : photo.image,
    visible,
    categories: {
      connect: categories.map((c) => ({ id: +c })),
    },
    user: {
      connect: { id: user.id },
    },
  };

  try {
    const photo = await prisma.photo.update({
      where: { slug: slug },
      data,
    });

    res.status(200).json({
      message: "Photo updated successfully",
      photo,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const destroy = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const photo = await prisma.photo.findUnique({
      where: { slug: slug },
    });
    await prisma.photo.delete({
      where: { slug: slug },
    });

    deleteImage(photo.image, "photos");

    res.status(200).json({
      message: "Photo deleted successfully",
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
