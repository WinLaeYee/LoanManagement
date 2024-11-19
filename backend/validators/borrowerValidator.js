

const Joi = require("joi");

const borrowerSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .messages({ "any.required": "Full name is required" }),
  contactInfo: Joi.object({
    phone: Joi.string()
      .required()
      ,
    email: Joi.string().email().required(),
  }).required(),
  address: Joi.string().required(),
  identificationNumber: Joi.string().required(),
});

module.exports = borrowerSchema;
