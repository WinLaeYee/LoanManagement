const express = require("express");
const BorrowerController = require("../controllers/BorrowerController");
const validate = require("../middlewares/validate");
const borrowerSchema = require("../validators/borrowerValidator");

const router = express.Router();

router.post("/", validate(borrowerSchema), BorrowerController.createBorrower);
router.get("/all", BorrowerController.getAllBorrowers);
router.get(
  "/:id",
  BorrowerController.getBorrowerById
);
router.put(
  "/:id",
  validate(borrowerSchema),
  BorrowerController.updateBorrower
);
router.delete(
  "/:id",
    BorrowerController.deleteBorrower
);

module.exports = router;
