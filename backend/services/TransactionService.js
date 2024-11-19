const transactionRepository = require("../repositories/TransactionRepository");

class TransactionService {
  async recordTransaction(data) {
    return await transactionRepository.create(data);
  }

  async getTransactionsByLoan(loanId) {
    return await transactionRepository.findTransactionsByLoan(loanId);
  }
}

module.exports = new TransactionService();
