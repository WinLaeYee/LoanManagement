const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Borrower",
    required: true,
  },
  loanAmount: { type: Number, required: true },
  loanType: { type: String, enum: ["Personal", "Mortgage"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  interestRate: { type: Number, required: true }, 
  totalRepaid: { type: Number, default: 0 },
  remainingBalance: {
    type: Number,
    default: function () {
      return this.loanAmount;
    },
  },
  accruedInterest: { type: Number, default: 0 }, 
});

module.exports = mongoose.model("Loan", loanSchema);
