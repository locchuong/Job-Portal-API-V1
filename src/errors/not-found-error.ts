import APIError from "@/errors/api-error";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends APIError {
  value: string;
  constructor(value) {
    super(null, StatusCodes.NOT_FOUND);
    this.value = value;
  }
}
