const DrugStore = require("../models/DrugStoreModel");
const { validateDrugStore } = DrugStore;

exports.createDrugStore = async (req, res) => {
  console.log('res: ', res);
  console.log('req: ', req);
  const { error } = validateDrugStore(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const drugStore = new DrugStore({
    name: req.body.name,
    address: req.body.address,
  });

  try {
    await drugStore.save();
    res.send(drugStore);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllDrugStores = async (req, res) => {
  try {
    const drugStores = await DrugStore.find();
    res.send(drugStores);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
