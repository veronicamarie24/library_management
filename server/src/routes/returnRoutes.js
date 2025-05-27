"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const returnController_ts_js_1 = require("../controllers/returnController.ts.js");
const router = (0, express_1.Router)();
router.post("/", returnController_ts_js_1.createReturn);
exports.default = router;
