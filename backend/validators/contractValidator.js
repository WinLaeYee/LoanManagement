
const Joi = require("joi");

const contractSchema = Joi.object({
  loanId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  contractDocument: Joi.string().required(), // For file validation, this might need enhancement
  signingDate: Joi.date().required(),
});

module.exports = contractSchema;
