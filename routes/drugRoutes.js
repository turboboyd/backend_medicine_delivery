const express = require("express");
const router = express.Router();
const drugController = require("../controllers/drugController");

router.get("/", drugController.getAllDrugs);
router.get("/company/:companyId", drugController.getDrugsByCompany);

module.exports = router;
