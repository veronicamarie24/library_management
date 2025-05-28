import { books } from "../data/stores";
import { Book } from "../models/bookModel";
import { InsufficientCopiesError, NotFoundError } from "../types/errors";

export const getAllBooks = () => {
  return Array.from(books.values());
};

export const getBookByIsbn = (isbn: string): Book => {
  const book = books.get(isbn);
  if (!book) throw new NotFoundError(`Book with ISBN ${isbn} not found.`);
  return book;
};

export const getBooksByIsbn = (isbns: string[]): Map<string, Book> => {
  const bookMap = new Map<string, Book>();
  isbns.forEach((isbn) => bookMap.set(isbn, getBookByIsbn(isbn)));
  return bookMap;
};

export const createBook = (
  isbn: string,
  title: string,
  author: string,
  copies: number
) => {
  const newBook: Book = {
    isbn,
    title,
    author,
    copies,
    available_copies: copies,
  };
  books.set(isbn, newBook);
  return newBook;
};

export const reduceCopies = (isbn: string, numCopies: number): void => {
  const book = getBookByIsbn(isbn);
  if (book.available_copies - numCopies < 0) {
    throw new InsufficientCopiesError();
  }
  books.set(isbn, {
    ...book,
    available_copies: (book.available_copies -= numCopies),
  });
};

export const increaseCopies = (isbn: string, numCopies: number): void => {
  const book = getBookByIsbn(isbn);
  books.set(isbn, {
    ...book,
    available_copies: (book.available_copies += numCopies),
  });
};
