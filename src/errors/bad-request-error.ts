import APIError from "@/errors/api-error";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends APIError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
