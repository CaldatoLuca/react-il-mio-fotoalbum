const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const CustomError = require("../exceptions/customError");

const store = async (req, res, next) => {
  const { email, message } = req.body;

  const data = {
    email,
    message,
  };

  console.log(req.body.email);

  try {
    const contactMessage = await prisma.contactMessage.create({ data });

    res.status(200).json({
      message: "Message sent successfully",
      contactMessage,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

const index = async (req, res, next) => {
  const { page = 1, limit = 50 } = req.query;

  const offset = (page - 1) * limit;
  const totalItems = await prisma.category.count();
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    return next(new CustomError("La pagina richiesta non esiste.", 400));
  }

  try {
    const contactMessages = await prisma.contactMessage.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    res.status(200).json({
      message: `${contactMessages.length} Messages found`,
      page: page,
      totalPages,
      contactMessages,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  store,
  index,
};
