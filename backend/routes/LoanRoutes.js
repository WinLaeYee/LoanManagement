const express = require("express");
const router = express.Router();
const loanController = require("../controllers/LoanController");
const authenticateJWT = require("../middlewares/authmiddleware");
const validate = require("../middlewares/validate");
const loanSchema = require("../validators/loanValidator");
const loanIdValidator = require("../validators/loanIdValidator");

router.post("/", validate(loanSchema), authenticateJWT, loanController.createLoan);
router.get("/all", authenticateJWT, loanController.getAllLoans);
router.get("/:id", authenticateJWT, validate(loanIdValidator), loanController.getLoanById);
router.get(
  "/borrower/:borrowerId",
  authenticateJWT,
  loanController.getLoansByBorrower
);
router.put(
  "/:id",
  authenticateJWT,
  validate(loanIdValidator),
  validate(loanSchema),
  loanController.updateLoan
);
router.delete(
  "/:id",
  authenticateJWT,
  validate(loanIdValidator),
  loanController.deleteLoan
);

module.exports = router;
