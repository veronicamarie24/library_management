"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseCopies = exports.reduceCopies = exports.createBook = exports.getBooksByIsbn = exports.getBookByIsbn = exports.getAllBooks = void 0;
const stores_1 = require("../data/stores");
const errors_1 = require("./errors");
const getAllBooks = () => {
    return Array.from(stores_1.books.values());
};
exports.getAllBooks = getAllBooks;
const getBookByIsbn = (isbn) => {
    const book = stores_1.books.get(isbn);
    if (!book)
        throw new errors_1.NotFoundError(`Book with ISBN ${isbn} not found.`);
    return book;
};
exports.getBookByIsbn = getBookByIsbn;
const getBooksByIsbn = (isbns) => {
    const bookMap = new Map();
    isbns.forEach((isbn) => bookMap.set(isbn, (0, exports.getBookByIsbn)(isbn)));
    return bookMap;
};
exports.getBooksByIsbn = getBooksByIsbn;
const createBook = (isbn, title, author, copies) => {
    const newBook = {
        isbn,
        title,
        author,
        copies,
        available_copies: copies,
    };
    stores_1.books.set(isbn, newBook);
    return newBook;
};
exports.createBook = createBook;
const reduceCopies = (isbn, numCopies) => {
    const book = (0, exports.getBookByIsbn)(isbn);
    if (book.available_copies - numCopies < 0) {
        throw new errors_1.InsufficientCopiesError();
    }
    stores_1.books.set(isbn, {
        ...book,
        available_copies: (book.available_copies -= numCopies),
    });
};
exports.reduceCopies = reduceCopies;
const increaseCopies = (isbn, numCopies) => {
    const book = (0, exports.getBookByIsbn)(isbn);
    stores_1.books.set(isbn, {
        ...book,
        available_copies: (book.available_copies += numCopies),
    });
};
exports.increaseCopies = increaseCopies;
