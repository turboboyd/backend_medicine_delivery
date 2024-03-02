const Drug = require("../models/Drug");
const Company = require("../models/Company");

const getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find().populate("company");
    res.json(drugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDrugsByCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    const drugs = await Drug.find({ company: company._id });
    res.json(drugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDrugs,
  getDrugsByCompany,
};
