const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware.js");
const { login } = require("../controlers/authController.js");

router.post("/login", login);
router.post("/validate", verifyToken, (req, res) => {
  res.send({ status: true });
});

module.exports = router;
