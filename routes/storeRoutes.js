const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

router.get("/drug-stores", storeController.listDrugStores);
router.post("/cart", storeController.addToCart);
router.get("/cart", storeController.viewCart);
router.post("/order", storeController.placeOrder);

module.exports = router;
