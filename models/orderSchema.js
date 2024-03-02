const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  address: String,
  medicines: [
    {
      medicineId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
