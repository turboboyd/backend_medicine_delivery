const ApiError = require("../error/ApiError");


const notFoundHandler = (err, req, res, next) => {
  const error = ApiError.notFound("Страница не найдена");
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Не предвидел ошибку" });
};

module.exports = { errorHandler, notFoundHandler };
