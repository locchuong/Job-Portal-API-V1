import { isCelebrateError } from "celebrate";
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Error as MongooseError } from "mongoose";

import { NotFoundError } from "@/errors";
import Logger from "@/loaders/logger.loader";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const response = {
    message: err.message || "Something went wrong, try again later.",
    error: null,
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Handle celebrate errors (Validation errors)
  if (isCelebrateError(err)) {
    response.message = "Validation error";
    response.error =
      err.details.get("body")?.message ||
      err.details.get("query")?.details?.[0]?.message ||
      err.details.get("params").details?.[0]?.message ||
      "Invalid request body";
    response.status = StatusCodes.BAD_REQUEST;
  }

  // Mongoose Schema Validation error
  if (err instanceof MongooseError.ValidationError) {
    response.message = "Validation error";
    response.error = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    response.status = StatusCodes.BAD_REQUEST;
  }

  // Mongoose duplicate key error
  if (err.code && err.code === 11000) {
    response.message = "Duplicate key error";
    response.error = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
    response.status = StatusCodes.BAD_REQUEST;
  }

  // Mongoose CastError
  if (err instanceof MongooseError.CastError || err instanceof NotFoundError) {
    response.message = "Resource not found";
    response.error = `No resource found with id: ${err.value}`;
    response.status = StatusCodes.NOT_FOUND;
  }

  Logger.error(`[${response.message}] ${response.error}`);
  return res.status(response.status).json(response);
};

export default errorMiddleware;
