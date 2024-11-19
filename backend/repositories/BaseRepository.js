class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll() {
    return await this.model.find();
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  // async delete(id) {
  //   return await this.model.findByIdAndDelete(id);
  // }
  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error in delete:", error.message);
      throw error;
    }
  }
}

module.exports = BaseRepository;
