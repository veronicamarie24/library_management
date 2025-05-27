"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetStores = void 0;
const stores_1 = require("../data/stores");
const resetStores = () => {
    stores_1.books.clear();
    stores_1.customers.clear();
    stores_1.checkouts.clear();
    stores_1.returns.clear();
};
exports.resetStores = resetStores;
