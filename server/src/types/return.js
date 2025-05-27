"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateReturnBody = isCreateReturnBody;
function isCreateReturnBody(body) {
    return typeof body.isbn === "string" && typeof body.customer_id === "string";
}
