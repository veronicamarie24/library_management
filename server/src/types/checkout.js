"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateCheckoutBody = isCreateCheckoutBody;
function isCreateCheckoutBody(body) {
    return (typeof body.isbn === "string" &&
        typeof body.customer_id === "string" &&
        typeof body.due_date === "string");
}
