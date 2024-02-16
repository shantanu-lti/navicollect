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
router.post("/get-sbu", verifyToken, getSbu);
router.post("/get-partner", verifyToken, getPartners);
router.post("/get-client", verifyToken, getClientByPartner);

module.exports = router;
