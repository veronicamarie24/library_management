"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomer = isCustomer;
exports.isGetCustomerByIdParams = isGetCustomerByIdParams;
exports.isGetCheckedOutBooksParams = isGetCheckedOutBooksParams;
function isCustomer(customer) {
    return (typeof customer.customer_id === "string" &&
        typeof customer.name === "string" &&
        typeof customer.email === "string");
}
function isGetCustomerByIdParams(params) {
    return typeof params.customer_id === "string";
}
function isGetCheckedOutBooksParams(params) {
    return typeof params.customer_id === "string";
}
