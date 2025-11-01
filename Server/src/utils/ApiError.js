class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    // Custom properties
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // Capture stack trace properly, excludes constructor call in trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ApiError };
