const Joi = require("joi");

const idValidationSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = idValidationSchema;
