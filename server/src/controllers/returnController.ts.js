"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReturn = void 0;
const return_1 = require("../types/return");
const returnService = __importStar(require("../services/returnService"));
const util_1 = require("../util");
const errors_1 = require("../services/errors");
const createReturn = (req, res) => {
    try {
        const body = req.body;
        if (!(0, return_1.isCreateReturnBody)(body)) {
            throw new errors_1.InvalidRequestBodyError();
        }
        const { isbn, customer_id } = body;
        const createdReturn = returnService.createReturn(isbn, customer_id);
        const returnResponse = {
            isbn: createdReturn.isbn,
            customer_id: createdReturn.customer_id,
            return_date: (0, util_1.formatDate)(createdReturn.return_date),
            message: "Book returned successfully",
        };
        res.status(200).json(returnResponse);
    }
    catch (err) {
        if (err instanceof errors_1.InvalidRequestBodyError) {
            res.status(400).json({ errorMessage: err.message });
        }
        else if (err instanceof errors_1.NotFoundError) {
            res.status(404).json({
                errorMessage: err.message,
            });
        }
        if (err instanceof errors_1.InvalidRequestBodyError) {
        }
        else {
            res.status(500).json({ errorMessage: errors_1.standardErrorMessage });
        }
    }
};
exports.createReturn = createReturn;
