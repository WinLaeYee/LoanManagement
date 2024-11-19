const transactionService = require("../services/TransactionService");

class TransactionController {
  async recordTransaction(req, res) {
    try {
      const transaction = await transactionService.recordTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTransactionsByLoan(req, res) {
    try {
      const transactions = await transactionService.getTransactionsByLoan(
        req.params.loanId
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TransactionController();
