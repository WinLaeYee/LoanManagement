const loanService = require("../services/LoanService");
const Borrower = require("../models/Borrower");
const Loan = require("../models/Loan");

class LoanController {
  async createLoan(req, res) {
    const {
      borrowerId,
      loanAmount,
      loanType,
      startDate,
      endDate,
      interestRate,
    } = req.body;

    try {
      const borrower = await Borrower.findById(borrowerId);
      if (!borrower) {
        return res.status(404).json({ error: "Borrower not found" });
      }

      const newLoan = new Loan({
        borrowerId,
        loanAmount,
        loanType,
        startDate,
        endDate,
        interestRate,
      });

      await newLoan.save();

      res
        .status(201)
        .json({ message: "Loan created successfully", loan: newLoan });
    } catch (error) {
      console.error("Error creating loan:", error.message);
      res.status(500).json({ error: "Failed to create loan" });
    }
  }

  async getAllLoans(req, res) {
    try {
      const loans = await Loan.find()
        .populate("borrowerId", "name email phone") // Populate borrower details
        .exec();

      res.status(200).json(loans);
    } catch (error) {
      console.error("Error fetching loans:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async getLoanById(req, res) {
    try {
      const loan = await loanService.getLoanById(req.params.id);
      res.status(200).json(loan);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getLoansByBorrower(req, res) {
    try {
      const loans = await loanService.getLoansByBorrower(req.params.borrowerId);
      res.status(200).json(loans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateLoan(req, res) {
    try {
      const loan = await loanService.updateLoan(req.params.id, req.body);
      res.status(200).json(loan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteLoan(req, res) {
    try {
      await loanService.deleteLoan(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoanController();
