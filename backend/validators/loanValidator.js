
const Joi = require("joi");

const loanSchema = Joi.object({
  borrowerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  loanAmount: Joi.number().positive().required(),
  loanType: Joi.string().valid("Personal", "Mortgage").required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  interestRate: Joi.number().positive().required(),
  totalRepaid: Joi.number().default(0),
  remainingBalance: Joi.number().optional(),
  accruedInterest: Joi.number().optional(),
});

module.exports = loanSchema;
