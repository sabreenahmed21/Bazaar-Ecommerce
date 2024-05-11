import appError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new appError(message, 400, httpStatusText.FAIL);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new appError(message, 400, httpStatusText.FAIL);
};

const handleErrorJwt = () => {
  return new appError(
    "Invalid token, please login again!",
    400,
    httpStatusText.FAIL
  );
};

const handleTokenExpiredError = () => {
  return new appError(
    "Token has expired, please login again!",
    401,
    httpStatusText.FAIL
  );
};

const handleNotFound = (req, res, next) => {
  const err = new appError(
    `Not found ${req.originalUrl} on this server`,
    404,
    httpStatusText.FAIL
  );
  next(err);
};

const sendError = (err, res) => {
  res.status(err.status).json({
    statusText: err.statusText,
    message: err.message,
  });
};

  const errorHandler = (err, req, res, next) => {  
  err.status =  400; 
  err.statusCode = err.statusCode || 500;
  err.statusText = err.statusText || "error";
  let error = { ...err };
  if (err.name === "CastError" && err.kind === "ObjectId") {
    error = handleCastErrorDB(err);
  }
  if (err.name === "ValidationError") {
    error = handleValidationError(err);
  }
  if (err.name === "JsonWebTokenError") {
    error = handleErrorJwt(err);
  }
  if (err.name === "TokenExpiredError") {
    error = handleTokenExpiredError(err);
  }
  sendError(err, res);
};

export { handleNotFound, errorHandler };