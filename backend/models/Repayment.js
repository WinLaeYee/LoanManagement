const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  paymentDate: { type: Date, required: true },
  amountPaid: { type: Number, required: true },
  remainingBalance: { type: Number, required: true },
  paymentTerm: { type: String, required: true }, // e.g., "12 months"
});

module.exports = mongoose.model("Repayment", repaymentSchema);
