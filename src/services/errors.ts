import { MAX_CHECKOUTS } from "../constants";

export type ErrorResponse = {
  errorMessage: string;
};

export const standardErrorMessage = "An error occurred.";

export class InvalidRequestParamsError extends Error {
  constructor() {
    super("Invalid request params.");
    this.name = "InvalidRequestParams";
  }
}

export class InvalidRequestBodyError extends Error {
  constructor() {
    super("Invalid request body.");
    this.name = "InvalidRequestBody";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class MaxCheckoutsError extends Error {
  constructor() {
    super(`Customer already has ${MAX_CHECKOUTS} books checked out.`);
    this.name = "MaxCheckoutsError";
  }
}

export class InsufficientCopiesError extends Error {
  constructor() {
    super(`There are not enough copies left to checkout for this book.`);
    this.name = "InsufficientCopiesError";
  }
}
