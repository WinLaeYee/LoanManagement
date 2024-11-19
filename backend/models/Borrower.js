const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  address: { type: String, required: true },
  identificationNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Borrower", borrowerSchema);
