const express = require("express");
const router = express.Router();
const {
  uploadExcel,
  getSbu,
  getPartners,
  getClientByPartner,
} = require("../controlers/accountPayableController");
const verifyToken = require("../middleware/authMiddleware");

// router.post("/upload-excel", uploadExcel);
router.post("/get-sbus", verifyToken, getSbu);
router.post("/get-partners", verifyToken, getPartners);
router.post("/get-clients", verifyToken, getClientByPartner);

module.exports = router;
