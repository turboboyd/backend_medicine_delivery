const mongoose = require("mongoose");
// const ctrlWrapper = require("../helpers/ctrlWrapper");
const { processOrderItems, createOrder } = require("../service/orderService");
const { Order } = require("../models/Order");
const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("medicines.medicineId", "name");
  res.status(200).json(orders);
};

const getOrdersByEmailOrPhone = async (req, res) => {
  const { searchQuery } = req.params;

  const orders = await Order.find({
    $or: [{ email: searchQuery }, { phoneNumber: searchQuery }],
  }).populate("medicines.medicineId", "name");

  if (!orders.length) {
    return res.status(404).send("Orders not found");
  }

  res.status(200).json(orders);
};

const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, phoneNumber, name, address, medicines } = req.body;
    await processOrderItems(medicines, session);
    await createOrder(email, phoneNumber, name, address, medicines, session);
    await session.commitTransaction();
    session.endSession();
    res.status(201).send("Order successful");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error when placing an order:", error);
    res.status(500).send("Server error when placing an order");
  }
};

module.exports = {
  placeOrder: ctrlWrapper(placeOrder),
  getAllOrders: ctrlWrapper(getAllOrders),
  getOrdersByEmailOrPhone: ctrlWrapper(getOrdersByEmailOrPhone),
};
