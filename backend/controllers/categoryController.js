const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");

const store = async (req, res, next) => {
  const { name } = req.body;

  const data = {
    name,
  };

  try {
    const category = await prisma.category.create({ data });

    res.status(200).json({
      message: "Category created successfully",
      category,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const index = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const offset = (page - 1) * limit;
  const totalItems = await prisma.category.count();
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    return next(new CustomError("La pagina richiesta non esiste.", 400));
  }

  try {
    const categories = await prisma.category.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${categories.length} Categories found`,
      page: page,
      totalPages,
      categories,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  store,
  index,
};
