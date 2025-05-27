"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateBookBody = isCreateBookBody;
exports.isGetBookByIsbnParams = isGetBookByIsbnParams;
function isCreateBookBody(body) {
    return (typeof body.isbn === "string" &&
        typeof body.title === "string" &&
        typeof body.author === "string" &&
        typeof body.copies === "number");
}
function isGetBookByIsbnParams(params) {
    return typeof params.isbn === "string";
}
