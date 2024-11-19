// validators/transactionValidator.js
const Joi = require("joi");

const transactionSchema = Joi.object({
  loanId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  transactionDate: Joi.date().required(),
  transactionType: Joi.string()
    .valid("Repayment", "Late Fee", "Penalty")
    .required(),
  amount: Joi.number().positive().required(),
  description: Joi.string().optional(),
});

module.exports = transactionSchema;
