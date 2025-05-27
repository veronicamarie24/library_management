"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckoutsForCustomer = exports.deleteCheckout = exports.createCheckout = void 0;
const constants_1 = require("../constants");
const stores_1 = require("../data/stores");
const bookService_1 = require("./bookService");
const errors_1 = require("./errors");
const createCheckout = (customerId, isbn, dueDate) => {
    if ((0, exports.getCheckoutsForCustomer)(customerId).length >= constants_1.MAX_CHECKOUTS) {
        throw new errors_1.MaxCheckoutsError();
    }
    (0, bookService_1.reduceCopies)(isbn, 1);
    const book = (0, bookService_1.getBookByIsbn)(isbn);
    // generate an id between 000001 and 999999
    const randomId = `CKO${String(Math.floor(Math.random() * 999999) + 1).padStart(6, "0")}`;
    const newCheckout = {
        isbn,
        customer_id: customerId,
        checkout_id: randomId,
        checkout_date: new Date(),
        due_date: new Date(dueDate),
        title: book.title,
    };
    stores_1.checkouts.set(newCheckout.checkout_id, newCheckout);
    return newCheckout;
};
exports.createCheckout = createCheckout;
const deleteCheckout = (isbn, customerId) => {
    const checkoutsForCustomer = (0, exports.getCheckoutsForCustomer)(customerId);
    const checkout = checkoutsForCustomer.find((checkout) => checkout.isbn === isbn);
    if (!checkout) {
        throw new errors_1.NotFoundError("This book is not checked out by this customer.");
    }
    stores_1.checkouts.delete(checkout.checkout_id);
};
exports.deleteCheckout = deleteCheckout;
const getCheckoutsForCustomer = (customerId) => {
    const customerCheckouts = [];
    for (const checkout of stores_1.checkouts.values()) {
        if (checkout.customer_id === customerId) {
            customerCheckouts.push(checkout);
        }
    }
    return customerCheckouts;
};
exports.getCheckoutsForCustomer = getCheckoutsForCustomer;
