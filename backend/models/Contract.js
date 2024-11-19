const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  contractDocument: { type: String, required: true }, 
  signingDate: { type: Date, required: true },
});

module.exports = mongoose.model("Contract", contractSchema);
