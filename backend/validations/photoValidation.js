const ValidationError = require("../exceptions/validationError");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const photoValidation = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Title must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Title must be a string",
      bail: true,
    },
    trim: true,
  },
  description: {
    in: ["body"],
    optional: true,
    notEmpty: {
      errorMessage: "Description must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Description must be a string",
      bail: true,
    },
    trim: true,
  },
  image: {
    in: ["file"],
    notEmpty: {
      errorMessage: "Image must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Image must be a string",
      bail: true,
    },
  },
  visible: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Visible must not be empty",
      bail: true,
    },
    isBoolean: {
      errorMessage: "Visible must be a boolean",
      bail: true,
    },
    toBoolean: true,
  },
  categories: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Categories must be not empty",
      bail: true,
    },
    isArray: {
      errorMessage: "Categories must be an array",
      bail: true,
    },
    custom: {
      options: async (ids) => {
        const intIds = ids.map((i) => +i);

        if (intIds.length === 0) {
          throw new ValidationError(
            `Photo must have at least one Category`,
            400
          );
        }
        const notIntegerId = intIds.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new ValidationError(`All ids must be integer`, 400);
        }
        const categories = await prisma.category.findMany({
          where: { id: { in: intIds } },
        });
        if (categories.length !== intIds.length) {
          throw new ValidationError(`Some categories were not found`, 404);
        }
        return true;
      },
    },
    customSanitizer: {
      options: (ids) => {
        return ids.map((id) => +id);
      },
    },
  },
};

const slugValidation = {
  slug: {
    in: ["params"],
    isString: {
      errorMessage: "Slug must be a string",
    },
    custom: {
      options: async (value) => {
        const photo = await prisma.photo.findUnique({
          where: { slug: value },
        });
        if (!photo) {
          throw new ValidationError(
            `Can't find a Photo with slug ${value}`,
            404
          );
        }
        return true;
      },
    },
  },
};
module.exports = {
  photoValidation,
  slugValidation,
};
