const BaseRepository = require("./BaseRepository");
const Repayment = require("../models/Repayment");

class RepaymentRepository extends BaseRepository {
  constructor() {
    super(Repayment);
  }

  async findRepaymentsByLoan(loanId) {
    return await this.model.find({ loanId });
  }
}

module.exports = new RepaymentRepository();
