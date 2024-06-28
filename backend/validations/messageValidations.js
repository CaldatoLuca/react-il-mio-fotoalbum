const { PrismaClient } = require("@prisma/client");

const messageValidation = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email must not be empty",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
      bail: true,
    },
    isLength: {
      errorMessage: "Email must be maximun 150 characters long",
      options: { max: 150 },
      bail: true,
    },
  },
  message: {
    in: ["body"],

    notEmpty: {
      errorMessage: "Message must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Message must be a string",
      bail: true,
    },
    trim: true,
  },
};

module.exports = {
  messageValidation,
};
