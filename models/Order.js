const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10,13}$/;
const medicineSchema = new Schema({
  medicineId: String,
  storeId: String,
  quantity: Number,
});

const orderSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [emailRegex, "Please fill a valid email address"],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [phoneRegex, "Please fill a valid phone"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  medicines: [medicineSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(new RegExp(emailRegex))
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "string.pattern.base": "Invalid email format.",
      "string.empty": "Email cannot be empty.",
      "any.required": "Email is required.",
    }),
  phoneNumber: Joi.string()
    .pattern(new RegExp(phoneRegex))
    .required()
    .messages({
      "string.pattern.base": "Phone Number Validation.",
      "string.empty": "Phone number cannot be empty.",
      "any.required": "Phone number is required.",
    }),
  name: Joi.string().required().messages({
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address cannot be empty.",
    "any.required": "Address is required.",
  }),
  medicines: Joi.array()
    .items(
      Joi.object({
        medicineId: Joi.string().required(),
        storeId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one medicine is required.",
      "any.required": "Medicines list is required.",
    }),
});

const Order = model("Order", orderSchema);

module.exports = {
  Order,
  orderValidationSchema,
};
