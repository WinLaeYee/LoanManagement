const repaymentRepository = require("../repositories/RepaymentRepository");
const loanRepository = require("../repositories/LoanRepository");

class RepaymentService {
  async recordRepayment(data) {
    const loan = await loanRepository.findById(data.loanId);
    if (!loan) {
      throw new Error("Loan not found");
    }

    
    const remainingBalance = loan.loanAmount - (loan.totalRepaid || 0);
    if (data.amountPaid <= 0 || data.amountPaid > remainingBalance) {
      throw new Error("Invalid repayment amount");
    }

    
    const newRemainingBalance = remainingBalance - data.amountPaid;

    
    const repayment = await repaymentRepository.create({
      loanId: data.loanId,
      paymentDate: data.paymentDate || new Date(),
      amountPaid: data.amountPaid,
      remainingBalance: newRemainingBalance,
      paymentTerm: data.paymentTerm,
    });

  
    loan.totalRepaid = (loan.totalRepaid || 0) + data.amountPaid;
    loan.remainingBalance = newRemainingBalance;

    await loan.save();

    return repayment;
  }

  async getRepaymentsByLoan(loanId) {
    return await repaymentRepository.findRepaymentsByLoan(loanId);
  }
}

module.exports = new RepaymentService();
