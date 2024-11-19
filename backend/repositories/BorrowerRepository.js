const BaseRepository = require("./BaseRepository");
const Borrower = require("../models/Borrower");

class BorrowerRepository extends BaseRepository {
  constructor() {
    super(Borrower);
  }
  async findAll(filter = {}, pagination = { skip: 0, limit: 10 }) {
    try {
      return await Borrower.find(filter)
        .skip(pagination.skip)
        .limit(pagination.limit);
    } catch (error) {
      throw new Error(`Database error in findAll: ${error.message}`);
    }
  }
}

module.exports = new BorrowerRepository();
