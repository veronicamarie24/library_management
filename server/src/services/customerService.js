"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckedOutBooks = exports.createCustomer = exports.getCustomerById = void 0;
const stores_1 = require("../data/stores");
const errors_1 = require("./errors");
const checkoutService_1 = require("./checkoutService");
const bookService_1 = require("./bookService");
const getCustomerById = (customerId) => {
    const customer = stores_1.customers.get(customerId);
    if (!customer)
        throw new errors_1.NotFoundError(`Customer not found.`);
    return customer;
};
exports.getCustomerById = getCustomerById;
const createCustomer = (newCustomer) => {
    stores_1.customers.set(newCustomer.customer_id, newCustomer);
    return newCustomer;
};
exports.createCustomer = createCustomer;
const getCheckedOutBooks = (customerId) => {
    const checkouts = (0, checkoutService_1.getCheckoutsForCustomer)(customerId);
    const books = (0, bookService_1.getBooksByIsbn)(checkouts.map((checkout) => checkout.isbn));
    return checkouts.map((checkout) => {
        const book = books.get(checkout.isbn);
        if (!book)
            throw new errors_1.NotFoundError(`Book with ISBN ${checkout.isbn} not found.`);
        return {
            ...checkout,
            author: book.author,
        };
    });
};
exports.getCheckedOutBooks = getCheckedOutBooks;
