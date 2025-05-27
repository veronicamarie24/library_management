"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
const router = (0, express_1.Router)();
router.post("/", customerController_1.createCustomer);
router.get("/:customer_id", customerController_1.getCustomerById);
router.get("/:customer_id/books", customerController_1.getCheckedOutBooks);
exports.default = router;
