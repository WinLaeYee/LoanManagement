
const Joi = require("joi");

const repaymentSchema = Joi.object({
  loanId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  paymentDate: Joi.date().required(),
  amountPaid: Joi.number().positive().required(),
  remainingBalance: Joi.number().positive().required(),
  paymentTerm: Joi.string().required(),
});

module.exports = repaymentSchema;
