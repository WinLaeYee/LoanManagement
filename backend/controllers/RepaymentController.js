const repaymentService = require("../services/RepaymentService");

class RepaymentController {
  async recordRepayment(req, res) {
    try {
      const repayment = await repaymentService.recordRepayment(req.body);
      res.status(201).json(repayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRepaymentsByLoan(req, res) {
    try {
      const repayments = await repaymentService.getRepaymentsByLoan(
        req.params.loanId
      );
      res.status(200).json(repayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRepaymentsByLoan(req, res) {
    try {
      const repayments = await repaymentService.getRepaymentsByLoan(req.params.loanId);
      res.status(200).json(repayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RepaymentController();
