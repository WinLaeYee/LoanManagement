const contractRepository = require("../repositories/ContractRepository");

class ContractService {
  async createContract(data) {
    const existingContract = await contractRepository.findContractByLoan(
      data.loanId
    );
    if (existingContract) {
      throw new Error("Contract already exists for this loan.");
    }

    // You can add more validation here, like ensuring the file type is valid, etc.
    return await contractRepository.createContract(data);
  }

  async getContractByLoan(loanId) {
    return await contractRepository.findContractByLoan(loanId);
  }
}

module.exports = new ContractService();
