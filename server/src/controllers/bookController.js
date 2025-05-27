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
exports.createBook = exports.getBookByIsbn = exports.getBooks = void 0;
const bookService = __importStar(require("../services/bookService"));
const types_1 = require("../types");
const errors_1 = require("../services/errors");
const getBooks = (req, res) => {
    const allBooks = bookService.getAllBooks();
    res.status(200).json(allBooks);
};
exports.getBooks = getBooks;
const getBookByIsbn = (req, res) => {
    try {
        const params = req.params;
        if (!(0, types_1.isGetBookByIsbnParams)(params)) {
            throw new errors_1.InvalidRequestParamsError();
        }
        const { isbn } = params;
        const book = bookService.getBookByIsbn(isbn);
        res.status(200).json(book);
    }
    catch (err) {
        if (err instanceof errors_1.InvalidRequestParamsError) {
            res.status(400).json({ errorMessage: err.message });
        }
        else if (err instanceof errors_1.NotFoundError) {
            res.status(404).json({ errorMessage: err.message });
        }
        else {
            res.status(500).json({ errorMessage: errors_1.standardErrorMessage });
        }
    }
};
exports.getBookByIsbn = getBookByIsbn;
const createBook = (req, res) => {
    try {
        const body = req.body;
        if (!(0, types_1.isCreateBookBody)(body)) {
            throw new errors_1.InvalidRequestBodyError();
        }
        const { isbn, title, author, copies } = body;
        const book = bookService.createBook(isbn, title, author, copies);
        res.status(201).json(book);
    }
    catch (err) {
        if (err instanceof errors_1.InvalidRequestBodyError) {
            res.status(400).json({ errorMessage: err.message });
        }
        else {
            res.status(500).json({ errorMessage: errors_1.standardErrorMessage });
        }
    }
};
exports.createBook = createBook;
