const Joi = require("joi");

const loanIdValidator = Joi.object({
  loanId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(), // Validate MongoDB ObjectId
});

module.exports = loanIdValidator;
