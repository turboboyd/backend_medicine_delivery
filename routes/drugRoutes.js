const express = require("express");
const router = express.Router();
const drugStoreController = require("../controllers/drugStoreController");

router.post("/", drugStoreController.createDrugStore);
router.get("/", drugStoreController.getAllDrugStores);
router.get("/:id/medicines", drugStoreController.getMedicinesByDrugStore);

module.exports = router;
