const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/TransactionController");
const authenticateJWT = require("../middlewares/authmiddleware");
const  validate  = require("../middlewares/validate");
const transactionSchema = require("../validators/transactionValidator");
const loanIdValidator = require("../validators/loanIdValidator");

router.post(
  "/",
  authenticateJWT,
  validate(transactionSchema),
  transactionController.recordTransaction
);
router.get(
  "/loan/:loanId",
  authenticateJWT,
  validate(loanIdValidator),
  validate(transactionSchema),
  transactionController.getTransactionsByLoan
);

module.exports = router;
