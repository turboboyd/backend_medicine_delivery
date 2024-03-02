const express = require("express");
const router = express.Router();
const drugStoreController = require("../controllers/drugStoreController");

router.post("/", drugStoreController.createDrugStore);
router.get("/", drugStoreController.getAllDrugStores);

module.exports = router;
