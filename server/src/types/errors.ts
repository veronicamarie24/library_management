import { MAX_CHECKOUTS } from "../constants";

export type ErrorResponse = {
  errorMessage: string;
};

export const standardErrorMessage = "An error occurred.";

export abstract class AppError extends Error {
  abstract statusCode: number;
  abstract code: string;

  constructor(message?: string) {
    super(message || standardErrorMessage);
    this.name = this.constructor.name;
  }
}

export class InvalidRequestParamsError extends AppError {
  statusCode = 400;
  code = "INVALID_REQUEST_PARAMS";

  constructor() {
    super("Invalid request params.");
  }
}

export class InvalidRequestBodyError extends AppError {
  statusCode = 400;
  code = "INVALID_REQUEST_BODY";

  constructor() {
    super("Invalid request body.");
  }
}

export class NotFoundError extends AppError {
  statusCode = 404;
  code = "NOT_FOUND";

  constructor(message: string) {
    super(message);
  }
}
export class MaxCheckoutsError extends AppError {
  statusCode = 400;
  code = "MAX_CHECKOUTS_EXCEEDED";

  constructor() {
    super(`Customer already has ${MAX_CHECKOUTS} books checked out.`);
  }
}

export class InsufficientCopiesError extends AppError {
  statusCode = 400;
  code = "INSUFFICIENT_COPIES";

  constructor() {
    super(`There are not enough copies left to checkout for this book.`);
  }
}

export class ForbiddenError extends AppError {
  statusCode = 403;
  code = "FORBIDDEN";

  constructor(message?: string) {
    super(message || "Forbidden.");
  }
}

export class UnauthorizedError extends AppError {
  statusCode = 401;
  code = "UNAUTHORIZED";

  constructor(message?: string) {
    super(message || "Unauthorized.");
  }
}

export class NoTokenProvidedError extends UnauthorizedError {
  constructor() {
    super("No token provided.");
  }
}

export class UserNotFoundError extends AppError {
  statusCode = 404;
  code = "USER_NOT_FOUND";

  constructor() {
    super("User not found.");
  }
}

export class InvalidPasswordError extends AppError {
  statusCode = 401;
  code = "INVALID_PASSWORD";

  constructor() {
    super("Invalid email or password.");
  }
}

export class JwtSecretMissingError extends AppError {
  statusCode = 404;
  code = "JWT_SECRET_MISSING";

  constructor() {
    super("JWT Secret variable is missing.");
  }
}
