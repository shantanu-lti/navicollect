const express = require("express");
const router = express.Router();
const { login } = require("../controlers/authController.js");

router.post("/login", login);

module.exports = router;
