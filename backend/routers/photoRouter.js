const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const validator = require("../middlewares/validator");
const authenticateJWT = require("../middlewares/authenticateJwt");
const photoController = require("../controllers/photoController");
const photoValidation = require("../validations/photoValidation");
const photoOwnership = require("../middlewares/photoOwnership");

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

router.get("/", photoController.index);

//controllo per rotte con slug
router.use("/:slug", validator(photoValidation.slugValidation));

router.get("/:slug", photoController.show);

router.use(authenticateJWT);

router.put(
  "/:slug",
  [
    upload.single("image"),
    photoOwnership,
    validator(photoValidation.photoValidation),
  ],
  photoController.update
);

//photoOwnership
router.delete("/:slug", photoController.destroy);

module.exports = router;
