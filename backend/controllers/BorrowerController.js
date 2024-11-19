const borrowerService = require("../services/BorrowerService");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

class BorrowerController {


  async createBorrower(req, res) {
    try {
      console.log("Incoming payload:", req.body); // Log payload
      const borrower = await borrowerService.createBorrower(req.body);
      console.log("Saved borrower:", borrower); // Log saved borrower
      const token = jwt.sign(
        { borrowerId: borrower._id, email: borrower.contactInfo.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ borrower, token });
    } catch (error) {
      console.error("Error in createBorrower:", error.message);
      res.status(500).json({ error: "Failed to create borrower" });
    }
  }

  async getBorrowerById(req, res) {
    try {
      const borrower = await borrowerService.getBorrowerById(req.params.id);
      res.status(200).json(borrower);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getAllBorrowers(req, res) {
    try {
      const borrowers = await borrowerService.getAllBorrowers();
      res.status(200).json(borrowers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBorrower(req, res) {
    try {
      const borrower = await borrowerService.updateBorrower(
        req.params.id,
        req.body
      );
      res.status(200).json(borrower);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBorrower(req, res) {
    try {
      await borrowerService.deleteBorrower(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BorrowerController();
