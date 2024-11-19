const BaseRepository = require("./BaseRepository");
const Loan = require("../models/Loan");

class LoanRepository extends BaseRepository {
  constructor() {
    super(Loan);
  }

  async findLoansByBorrower(borrowerId) {
    return await this.model.find({ borrowerId });
  }
}

module.exports = new LoanRepository();
