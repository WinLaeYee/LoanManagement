const express = require("express");
const router = express.Router();
const repaymentController = require("../controllers/RepaymentController");
const authenticateJWT = require("../middlewares/authmiddleware");
const validate = require("../middlewares/validate");
const repaymentSchema = require("../validators/repaymentValidator");
const loanIdValidator = require("../validators/loanIdValidator");

router.post(
  "/",
  authenticateJWT,
  validate(repaymentSchema),
  repaymentController.recordRepayment
);
router.get(
  "/loan/:loanId",
  authenticateJWT,
  validate(loanIdValidator),
  repaymentController.getRepaymentsByLoan
);

module.exports = router;
