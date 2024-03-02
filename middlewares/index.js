
const { errorHandler, notFoundHandler } = require("./ErrorHandlingMiddleware");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
// const sendEmail = require("./sendEmailCampaign");

module.exports = {
  notFoundHandler,
  errorHandler,
  validateBody,
  authenticate,

};

