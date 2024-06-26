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

module.exports = {
  store,
};
