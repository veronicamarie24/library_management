import { MAX_CHECKOUTS } from "../constants";

export type ErrorResponse = {
  errorMessage: string;
};

export const standardErrorMessage = "An error occurred.";
export const invalidReqBodyMessage = "Invalid request body.";
export const invalidReqParamsMessage = "Invalid request params.";

export class NotFoundError extends Error {
  constructor(message: string, object?: any) {
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
