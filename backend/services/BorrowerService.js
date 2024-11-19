const borrowerRepository = require("../repositories/BorrowerRepository");


class BorrowerService {
  async createBorrower(data) {

    const existingBorrower = await borrowerRepository.findAll({
      "contactInfo.email": data.contactInfo.email,
    });
    if (existingBorrower.length > 0) {
      throw new Error("Borrower with this email already exists.");
    }
    return await borrowerRepository.create(data);
  }



  async getBorrowerById(id) {
    const borrower = await borrowerRepository.findById(id);
    if (!borrower) {
      throw new Error("Borrower not found");
    }
    return borrower;
  }

  async getAllBorrowers() {
    return await borrowerRepository.findAll();
  }

  async updateBorrower(id, data) {
    const borrower = await this.getBorrowerById(id);
    return await borrowerRepository.update(id, data);
  }

  async deleteBorrower(id) {
    const borrower = await this.getBorrowerById(id);
    return await borrowerRepository.delete(id);
  }
}

module.exports = new BorrowerService();
