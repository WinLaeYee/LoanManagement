const BaseRepository = require("./BaseRepository");
const Transaction = require("../models/Transaction");

class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }

  async findTransactionsByLoan(loanId) {
    return await this.model.find({ loanId });
  }
}

module.exports = new TransactionRepository();
