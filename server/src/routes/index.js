"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const customerRoutes_1 = __importDefault(require("./customerRoutes"));
const checkoutRoutes_1 = __importDefault(require("./checkoutRoutes"));
const returnRoutes_1 = __importDefault(require("./returnRoutes"));
const resetRoutes_1 = __importDefault(require("./resetRoutes"));
const router = (0, express_1.Router)();
router.use("/books", bookRoutes_1.default);
router.use("/customers", customerRoutes_1.default);
router.use("/checkouts", checkoutRoutes_1.default);
router.use("/returns", returnRoutes_1.default);
router.use("/reset", resetRoutes_1.default);
exports.default = router;
