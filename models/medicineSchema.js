const { Schema, model } = require("mongoose");
const Joi = require("joi");

const medicineSchema = new Schema({
  name: { type: String, required: true },
  availableInStores: [
    {
      storeId: {
        type: Schema.Types.ObjectId,
        ref: "DrugStore",
        required: true,
      },
      price: { type: Number, required: true },
      availableQuantity: { type: Number, required: true },
    },
  ],
});

const medicineJoiSchema = Joi.object({
  name: Joi.string().required(),
  availableInStores: Joi.array().items(
    Joi.object({
      storeId: Joi.string().required(),
      price: Joi.number().required(),
      availableQuantity: Joi.number().required(),
    })
  ),
});

module.exports = model("Medicine", medicineSchema);
module.exports.validateMedicine = (medicine) =>
  medicineJoiSchema.validate(medicine);
