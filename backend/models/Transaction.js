const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  transactionDate: { type: Date, required: true },
  transactionType: {
    type: String,
    enum: ["Repayment", "Late Fee", "Penalty"],
    required: true,
  },
  amount: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
