


const loanRepository = require("../repositories/LoanRepository");
const Loan = require("../models/Loan");
const { calculateInterest } = require("../utils/interestCalculator");

class LoanService {
  async createLoan(data) {
    if (data.interestRate < 0 || data.interestRate > 20) {
      throw new Error("Interest rate must be between 0% and 20%");
    }

    // Use the calculateInterest utility
    data.accruedInterest = calculateInterest(
      data.loanAmount,
      data.interestRate,
      data.startDate,
      data.endDate
    );

    return await loanRepository.create(data);
  }

  async updateLoan(id, data) {
    if (
      data.loanAmount ||
      data.interestRate ||
      data.startDate ||
      data.endDate
    ) {
      const loan = await loanRepository.findById(id);
      const updatedAmount = data.loanAmount || loan.loanAmount;
      const updatedRate = data.interestRate || loan.interestRate;
      const startDate = data.startDate || loan.startDate;
      const endDate = data.endDate || loan.endDate;

      // Recalculate using the calculateInterest utility
      data.accruedInterest = calculateInterest(
        updatedAmount,
        updatedRate,
        startDate,
        endDate
      );
    }

    return await loanRepository.update(id, data);
  }

  async deleteLoan(id) {
    return await loanRepository.delete(id);
  }

    async getLoanById(id) {
      return await loanRepository.findById(id);
    }

    async getLoansByBorrower(borrowerId) {
      return await Loan.find({ borrowerId }).populate(
        "borrowerId",
        "fullName contactInfo.phone contactInfo.email"
      );
    }
}

module.exports = new LoanService();

