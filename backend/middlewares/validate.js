// middleware/validate.js
const validate = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false, 
      allowUnknown: true, 
      stripUnknown: true, 
    };

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    req.body = value; 
    next();
  };
};

module.exports = validate;
