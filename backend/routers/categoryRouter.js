const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const validator = require("../middlewares/validator");
const validation = require("../validations/categoryValidation");
const authtenticateJwt = require("../middlewares/authenticateJwt");
const isSuperAdmin = require("../middlewares/isSuperAdmin");

router.use(authtenticateJwt);
router.use(isSuperAdmin);

router.post(
  "/",
  validator(validation.categoryValidation),
  categoryController.store
);

router.get("/", categoryController.index);

module.exports = router;
