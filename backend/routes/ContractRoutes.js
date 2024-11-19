const express = require("express");
const router = express.Router();
const contractController = require("../controllers/ContractController");
const authenticateJWT = require("../middlewares/authmiddleware.js");
const validate = require("../middlewares/validate");
const contractSchema = require("../validators/contractValidator.js");
const loanIdValidator = require("../validators/loanIdValidator.js");

router.post("/", validate(contractSchema), authenticateJWT, contractController.createContract);
router.get(
  "/loan/:loanId",
  authenticateJWT,
  validate(loanIdValidator),
  contractController.getContractByLoan
);
router.get(
  "/download/:loanId",
  authenticateJWT,
  validate(loanIdValidator),
  contractController.downloadContract
); 

module.exports = router;
