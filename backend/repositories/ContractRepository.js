const BaseRepository = require("./BaseRepository");
const Contract = require("../models/Contract");

class ContractRepository extends BaseRepository {
  constructor() {
    super(Contract); 
  }

  async findContractByLoan(loanId) {
    return await this.model.findOne({ loanId });
  }

  async createContract(contractData) {
    return await this.model.create(contractData);
  }
}

module.exports = new ContractRepository();
