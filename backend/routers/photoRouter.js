const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validator = require("../middlewares/validator");
const authenticateJWT = require("../middlewares/authenticateJwt");
const photoController = require("../controllers/photoController");
const photoValidation = require("../validations/photoValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/photos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);

    cb(null, "image-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  [
    upload.single("image"),
    authenticateJWT,
    validator(photoValidation.photoValidation),
  ],
  photoController.store
);

module.exports = router;
