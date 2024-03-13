import APIError from "@/errors/api-error";
import { StatusCodes } from "http-status-codes";

export default class UnauthorizedError extends APIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
