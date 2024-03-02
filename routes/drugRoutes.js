const express = require("express");
const router = express.Router();
const drugStoreController = require("../controllers/drugStoreController");
const paginate = require("../middlewares/paginate");

router.post("/", drugStoreController.createDrugStore);
router.get("/", paginate, drugStoreController.getAllDrugStores);
router.get(
  "/:id/medicines",
  paginate,
  drugStoreController.getMedicinesByDrugStore
);

module.exports = router;
