class ApiError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static UnauthorizedError(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static Conflict(message) {
    return new ApiError(409, message);
  }

  static unsupportedMediaType(message) {
    return new ApiError(415, message);
  }
}

module.exports = ApiError;
