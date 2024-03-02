const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drugs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drug",
    },
  ],
});

module.exports = mongoose.model("Company", CompanySchema);
