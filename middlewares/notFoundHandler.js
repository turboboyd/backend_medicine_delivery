const ApiError = require("../error/ApiError");


const notFoundHandler = (err, req, res, next) => {
  const error = ApiError.notFound("Страница не найдена");
  next(error);
};

