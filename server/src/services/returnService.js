"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReturn = void 0;
const stores_1 = require("../data/stores");
const bookService_1 = require("./bookService");
const checkoutService_1 = require("./checkoutService");
const createReturn = (isbn, customerId) => {
    // generate an id between 000001 and 999999
    const randomId = `RTN${String(Math.floor(Math.random() * 999999) + 1).padStart(6, "0")}`;
    (0, bookService_1.increaseCopies)(isbn, 1);
    (0, checkoutService_1.deleteCheckout)(isbn, customerId);
    const createdReturn = {
        return_id: randomId,
        isbn,
        customer_id: customerId,
        return_date: new Date(),
    };
    stores_1.returns.set(randomId, createdReturn);
    return createdReturn;
};
exports.createReturn = createReturn;
