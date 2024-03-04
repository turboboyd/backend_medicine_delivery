const DrugStore = require("../models/DrugStoreModel");
const { Medicine } = require("../models/MedicineModel");
const getPaginatedData = require("../utils/getPaginatedData");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const { validateDrugStore } = DrugStore;

const createDrugStore = async (req, res) => {
  const { error } = validateDrugStore(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const drugStore = new DrugStore(req.body);
  await drugStore.save();
  res.send(drugStore);
};
const getAllDrugStores = async (req, res) => {
  const paginationResult = await getPaginatedData(
    DrugStore,
    {},
    req.pagination
  );
  res.json(paginationResult);
};

const getMedicinesByDrugStore = async (req, res) => {
  const paginationResult = await getPaginatedData(
    Medicine,
    { "availableInStores.storeId": req.params.id },
    req.pagination
  );
  res.json(paginationResult);
};

module.exports = {
  createDrugStore: ctrlWrapper(createDrugStore),
  getAllDrugStores: ctrlWrapper(getAllDrugStores),
  getMedicinesByDrugStore: ctrlWrapper(getMedicinesByDrugStore),
};
