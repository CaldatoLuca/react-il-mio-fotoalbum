const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validator");
const { messageValidation } = require("../validations/messageValidations");
const authenticateJWT = require("../middlewares/authenticateJwt");
const isSuperAdmin = require("../middlewares/isSuperAdmin");
const messageController = require("../controllers/messageController");

router.post("/", validator(messageValidation), messageController.store);

router.use(authenticateJWT);
router.use(isSuperAdmin);

router.get("/", messageController.index);

module.exports = router;
