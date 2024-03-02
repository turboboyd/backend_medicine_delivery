const ApiError = require("../error/ApiError");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(ApiError.badRequest(error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
