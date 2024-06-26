const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validator = require("../middlewares/validator");
const authController = require("../controllers/authController");
const authValidation = require("../validations/authValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);

    cb(null, "image-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register",
  [upload.single("image"), validator(authValidation.register)],
  authController.register
);

router.post(
  "/login",
  [upload.none(), validator(authValidation.login)],
  authController.login
);

module.exports = router;
