const { Schema, model } = require("mongoose");
const Joi = require("joi");

const DrugStoreModel = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

const drugStoreJoiSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = model("DrugStore", DrugStoreModel);
module.exports.validateDrugStore = (drugStore) => drugStoreJoiSchema.validate(drugStore);
