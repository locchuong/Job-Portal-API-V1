import { StatusCodes } from "http-status-codes";

export default class APIError extends Error {
  statusCode: StatusCodes;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
