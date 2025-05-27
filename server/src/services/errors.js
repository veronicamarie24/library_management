"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientCopiesError = exports.MaxCheckoutsError = exports.NotFoundError = exports.InvalidRequestBodyError = exports.InvalidRequestParamsError = exports.standardErrorMessage = void 0;
const constants_1 = require("../constants");
exports.standardErrorMessage = "An error occurred.";
class InvalidRequestParamsError extends Error {
    constructor() {
        super("Invalid request params.");
        this.name = "InvalidRequestParams";
    }
}
exports.InvalidRequestParamsError = InvalidRequestParamsError;
class InvalidRequestBodyError extends Error {
    constructor() {
        super("Invalid request body.");
        this.name = "InvalidRequestBody";
    }
}
exports.InvalidRequestBodyError = InvalidRequestBodyError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class MaxCheckoutsError extends Error {
    constructor() {
        super(`Customer already has ${constants_1.MAX_CHECKOUTS} books checked out.`);
        this.name = "MaxCheckoutsError";
    }
}
exports.MaxCheckoutsError = MaxCheckoutsError;
class InsufficientCopiesError extends Error {
    constructor() {
        super(`There are not enough copies left to checkout for this book.`);
        this.name = "InsufficientCopiesError";
    }
}
exports.InsufficientCopiesError = InsufficientCopiesError;
