const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getOrdersByEmailOrPhone,
} = require("../../controllers/storeController");
const validateBody = require("../../middlewares/validateBody");
const {
  orderValidationSchema,
} = require("../../models/Order");

router.post("/order", validateBody(orderValidationSchema), placeOrder);

router.get("/orders", getAllOrders);
router.get("/orders/search/:searchQuery", getOrdersByEmailOrPhone);

module.exports = router;
