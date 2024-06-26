const ValidationError = require("../exceptions/validationError");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryValidation = {
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const regex = /^[a-zA-Z\s]+$/;

        if (!regex.test(value)) {
          throw new ValidationError(
            "Name must contain only letters and spaces",
            400
          );
        }
        const category = await prisma.category.findUnique({
          where: { name: value },
        });

        if (category) {
          throw new ValidationError(`Category already exist`, 400);
        }

        return true;
      },
    },
    trim: true,
  },
};

const idValidation = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "Id must be an intager",
    },
    custom: {
      options: async (value) => {
        const category = await prisma.category.findUnique({
          where: { id: +value },
        });
        if (!category) {
          throw new ValidationError(
            `Can't find a Category with id ${value}`,
            404
          );
        }
        return true;
      },
    },
  },
};

module.exports = {
  categoryValidation,
  idValidation,
};
