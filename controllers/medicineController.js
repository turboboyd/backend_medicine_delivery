const Medicine = require("../models/MedicineModel"); // Путь к вашей модели Medicine
const { validateMedicine } = Medicine;

exports.createMedicine = async (req, res) => {
  const { error } = validateMedicine(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const medicine = new Medicine({
    name: req.body.name,
    availableInStores: req.body.availableInStores,
  });

  try {
    await medicine.save();
    res.send(medicine);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate(
      "availableInStores.storeId"
    );
    res.send(medicines);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
