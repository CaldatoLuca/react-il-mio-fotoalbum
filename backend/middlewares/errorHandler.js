const CustomError = require("../exceptions/customError");
const ValidationError = require("../exceptions/validationError");
const AuthError = require("../exceptions/authError");
const deleteImage = require("../utils/deleteImage");

module.exports = (err, req, res, next) => {
  if (
    err instanceof CustomError ||
    err instanceof ValidationError ||
    err instanceof AuthError
  ) {
    if (
      req.path === "/auth/register" &&
      req.file &&
      err instanceof ValidationError
    ) {
    }
    if (req.file && err instanceof ValidationError) {
      if (req.path === "/auth/register") {
        deleteImage(req.file.filename, "users");
      }
    }

    res.status(err.statusCode).json({
      status: err.name,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // se non è lanciato da me è un default 500
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: err.message,
    });
  }
};
