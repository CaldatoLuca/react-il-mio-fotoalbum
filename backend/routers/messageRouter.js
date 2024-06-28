const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validator");
const { messageValidation } = require("../validations/messageValidations");
const messageController = require("../controllers/messageController");

router.post("/", validator(messageValidation), messageController.store);

router.get("/", messageController.index);

module.exports = router;
