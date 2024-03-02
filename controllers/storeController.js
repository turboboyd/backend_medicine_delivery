const DrugStore = require("../models/DrugStore");
const Order = require("../models/Order");

exports.listDrugStores = async (req, res) => {
  try {
    const drugStores = await DrugStore.find({}).populate("medicines");
    res.json(drugStores);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addToCart = (req, res) => {
  const { medicineId, quantity } = req.body;
  let cart = req.session.cart ? req.session.cart : [];
  let itemIndex = cart.findIndex((item) => item.medicineId === medicineId);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += quantity; // Обновляем количество, если товар уже в корзине
  } else {
    cart.push({ medicineId, quantity }); // Добавляем новый товар, если его еще нет в корзине
  }

  req.session.cart = cart; // Обновляем корзину в сессии
  res.status(200).send("Товар добавлен в корзину");
};

exports.viewCart = (req, res) => {
  res.json(req.session.cart || []); // Возвращаем содержимое корзины из сессии
};

exports.placeOrder = async (req, res) => {
  const { email, phoneNumber, address, medicines } = req.body;

  try {
    // Проверка наличия товаров и обновление количества
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

    // Создание заказа
    const newOrder = new Order({ email, phoneNumber, address, medicines });
    await newOrder.save();
    req.session.cart = []; // Очистка корзины после оформления заказа
    res.status(201).send("Заказ успешно оформлен");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
