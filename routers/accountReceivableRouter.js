const express = require("express");
const router = express.Router();
const {
  uploadExcel,
  getSbu,
  getPartners,
  getClientByPartner,
  getClients,
  analyseRisk,
  saveRiskAnalysis,
  getPastDataByCompanyName,
  getPastDataById,
} = require("../controlers/accountReceivableController");
const verifyToken = require("../middleware/authMiddleware");

// router.post("/upload-excel", uploadExcel);
router.post("/get-sbus", verifyToken, getSbu);
router.post("/get-partners", verifyToken, getPartners);
router.post("/get-clients-by-partner", verifyToken, getClientByPartner);
router.post("/get-clients", verifyToken, getClients);
router.post("/risk-analysis", verifyToken, analyseRisk);
router.post("/risk-analysis/save", verifyToken, saveRiskAnalysis);
router.get("/risk-analysis/past-data", verifyToken, getPastDataByCompanyName);
router.get("/risk-analysis/past-data/id", verifyToken, getPastDataById);
module.exports = router;
