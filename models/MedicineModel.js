const { Schema, model } = require("mongoose");
const Joi = require("joi");

const medicineSchema = new Schema({
  name: { type: String, required: true },
  availableInStores: [
    {
      storeId: {
        type: String,
        required: true,
      },
      price: { type: Number, required: true },
      availableQuantity: { type: Number, required: true },
    },
  ],
});

const medicineItemSchema = Joi.object({
  storeId: Joi.string().required(),
  price: Joi.number().required(),
  availableQuantity: Joi.number().required(),
});

const medicineJoiSchema = Joi.object({
  name: Joi.string().required(),
  availableInStores: Joi.array().items(medicineItemSchema),
});

const medicineItemOderSchema = Joi.object({
  medicineId: Joi.string().required(),
  storeId: Joi.string().required(),
  quantity: Joi.number().required(),
});

const medicinesArraySchema = Joi.array()
  .items(medicineItemSchema)
  .min(1)
  .required()
  .messages({
    "array.min": `The order must be followed for at least one medication.`,
    "any.required": `A list of medications is required.`,
  });

const Medicine = model("Medicine", medicineSchema);
const validateMedicine = (medicine) =>
  medicineJoiSchema.validate(medicine);

  module.exports = {
    Medicine,
    medicineSchema,
    medicineJoiSchema,
    medicineItemSchema,
    medicinesArraySchema,
    validateMedicine,
    medicineItemOderSchema,
  };
