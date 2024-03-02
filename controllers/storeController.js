const DrugStore = require("../models/DrugStore");
const Order = require("../models/Order");
const ctrlWrapper = require("../middleware/ctrlWrapper");

exports.listDrugStores = ctrlWrapper(async (req, res) => {
  const drugStores = await DrugStore.find({}).populate("medicines");
  res.json(drugStores);
});

exports.addToCart = ctrlWrapper((req, res) => {
  const { medicineId, quantity } = req.body;
  let cart = req.session.cart ? req.session.cart : [];
  let itemIndex = cart.findIndex((item) => item.medicineId === medicineId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += quantity;
  } else {
    cart.push({ medicineId, quantity });
  }

  req.session.cart = cart;
  res.status(200).send("Товар добавлен в корзину");
});

exports.viewCart = ctrlWrapper((req, res) => {
  res.json(req.session.cart || []);
});

exports.placeOrder = ctrlWrapper(async (req, res) => {
  const { email, phoneNumber, address, medicines } = req.body;

  for (const item of medicines) {
    const storeItem = await DrugStore.findOne({
      "medicines._id": item.medicineId,
    });
    const medicine = storeItem.medicines.id(item.medicineId);
    if (medicine.availableQuantity < item.quantity) {
      return res
        .status(400)
        .send(`Недостаточное количество товара: ${medicine.name}`);
    }
    medicine.availableQuantity -= item.quantity;
    await storeItem.save();
  }

  const newOrder = new Order({ email, phoneNumber, address, medicines });
  await newOrder.save();
  req.session.cart = [];
  res.status(201).send("Заказ успешно оформлен");
});
