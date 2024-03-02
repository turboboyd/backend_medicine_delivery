const DrugStore = require("../models/DrugStoreModel");
const Medicine = require("../models/MedicineModel");
const { validateDrugStore } = DrugStore;

// Миддлвар для обработки асинхронных функций
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(500).send(err.message);
  });
};

exports.createDrugStore = asyncHandler(async (req, res) => {
  const { error } = validateDrugStore(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const drugStore = new DrugStore(req.body);
  await drugStore.save();
  res.send(drugStore);
});

exports.getAllDrugStores = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const drugStores = await DrugStore.find().skip(skip).limit(pageSize);

  const total = await DrugStore.countDocuments();

  res.send({
    page,
    pageSize,
    total,
    data: drugStores,
  });
});

exports.getMedicinesByDrugStore = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const skip = (page - 1) * pageSize;

  const drugStoreId = req.params.id;
  const medicines = await Medicine.find({
    "availableInStores.storeId": drugStoreId,
  })
    .skip(skip)
    .limit(pageSize);

  const total = await Medicine.countDocuments({
    "availableInStores.storeId": drugStoreId,
  });

  res.send({
    page,
    pageSize,
    total,
    data: medicines,
  });
});
