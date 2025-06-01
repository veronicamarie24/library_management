import { books } from "../data/bookStore";
import { Book } from "../models/bookModel";
import { BookQueryOptions } from "../types";
import { InsufficientCopiesError, NotFoundError } from "../types/errors";

export const getAllBooks = () => {
  return Array.from(books.values());
};

export const getBooks = (options: BookQueryOptions) => {
  const {
    author,
    title,
    isbn,
    sortBy = "title",
    limit = 20,
    order = "asc",
  } = options;

  const allBooks = getAllBooks();
  let modifiedBooks = allBooks;

  if (author || title || isbn) {
    modifiedBooks = modifiedBooks.filter((book) => {
      const matchesAuthor =
        !author || book.author.toLowerCase().includes(author.toLowerCase());

      const matchesTitle =
        !title || book.title.toLowerCase().includes(title.toLowerCase());

      const matchesISBN = !isbn || book.isbn.includes(isbn);

      // All specified criteria must match
      return matchesAuthor && matchesTitle && matchesISBN;
    });
  }

  const isAscendingOrder = order === "asc";

  // sort by strings
  if (sortBy === "author" || sortBy === "title") {
    modifiedBooks.sort((aBook, bBook) => {
      const aBookVal =
        sortBy === "author"
          ? aBook.author.toLowerCase()
          : aBook.title.toLowerCase();
      const bBookVal =
        sortBy === "author"
          ? bBook.author.toLowerCase()
          : bBook.title.toLowerCase();

      return isAscendingOrder
        ? aBookVal.localeCompare(bBookVal)
        : bBookVal.localeCompare(aBookVal);
    });
  } else if (sortBy === "created") {
    // sort by time
    modifiedBooks.sort((aBook, bBook) => {
      const aBookTime = aBook.created.getTime();
      const bBookTime = bBook.created.getTime();
      return isAscendingOrder ? aBookTime - bBookTime : bBookTime - aBookTime;
    });
  } else if (sortBy === "isbn") {
    // sort by number
    modifiedBooks.sort((aBook, bBook) => {
      const aIsbn = Number(aBook.isbn) || 0;
      const bIsbn = Number(aBook.isbn) || 0;

      return isAscendingOrder ? aIsbn - bIsbn : bIsbn - aIsbn;
    });
  }

  return limit >= 0 ? modifiedBooks.slice(0, limit) : modifiedBooks;
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
    created: new Date(),
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
