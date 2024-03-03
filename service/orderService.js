const { Order } = require("../models/Order");
const {
  Medicine,
} = require("../models/MedicineModel");

const processOrderItems = async (medicines, session) => {
  for (const item of medicines) {
    const medicine = await Medicine.findOne({
      _id: item.medicineId,
      "availableInStores.storeId": item.storeId,
    }).session(session); 

    if (!medicine) {
      await session.abortTransaction();
      return res
        .status(404)
        .send(
          `Medicine or pharmacy not found. MedicineId: ${item.medicineId}, StoreId: ${item.storeId}`
        );
    }

    const store = medicine.availableInStores.find(
      (store) => store.storeId.toString() === item.storeId
    );

    if (!store || store.availableQuantity < item.quantity) {
      await session.abortTransaction();
      return res
        .status(400)
        .send(
          `Insufficient quantity of goods: ${medicine.name} в аптеке не достаточно. Доступное количество: ${store ? store.availableQuantity : "not indicated"}`
        );
    }

    store.availableQuantity -= item.quantity;
    await medicine.save({ session });
  }
};

const createOrder = async (
  email,
  phoneNumber,
  name,
  address,
  medicines,
  session
) => {
  const newOrder = new Order({
    email,
    phoneNumber,
    name,
    address,
    medicines: medicines.map((item) => ({
      medicineId: item.medicineId,
      quantity: item.quantity,
      storeId: item.storeId,
    })),
  });

  return await newOrder.save({ session });
};


module.exports = {
  processOrderItems,
  createOrder,
};
