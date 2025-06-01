import { Book } from "../models/bookModel";

// Key: isbn
export const books = new Map<string, Book>();

export const initializeBookStore = async () => {
  const book1: Book = {
    isbn: "978-0-7432-7356-5",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    copies: 15,
    available_copies: 12,
    created: new Date("2023-01-15"),
  };

  const book2: Book = {
    isbn: "978-0-452-28423-4",
    title: "1984",
    author: "George Orwell",
    copies: 20,
    available_copies: 18,
    created: new Date("2023-02-10"),
  };

  const book3: Book = {
    isbn: "978-0-06-112008-4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    copies: 12,
    available_copies: 8,
    created: new Date("2023-03-05"),
  };

  const book4: Book = {
    isbn: "978-0-14-017739-8",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    copies: 18,
    available_copies: 15,
    created: new Date("2023-03-20"),
  };

  const book5: Book = {
    isbn: "978-0-06-935066-5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    copies: 10,
    available_copies: 7,
    created: new Date("2023-04-12"),
  };

  const book6: Book = {
    isbn: "978-0-547-92822-7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    copies: 25,
    available_copies: 22,
    created: new Date("2023-05-08"),
  };

  const book7: Book = {
    isbn: "978-0-06-440055-8",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    copies: 14,
    available_copies: 11,
    created: new Date("2023-06-15"),
  };

  const book8: Book = {
    isbn: "978-0-385-50420-4",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    copies: 16,
    available_copies: 13,
    created: new Date("2023-07-22"),
  };

  const book9: Book = {
    isbn: "978-0-7352-2190-9",
    title: "Atomic Habits",
    author: "James Clear",
    copies: 13,
    available_copies: 10,
    created: new Date("2023-08-30"),
  };

  const book10: Book = {
    isbn: "978-0-593-13514-7",
    title: "The Midnight Library",
    author: "Matt Haig",
    copies: 11,
    available_copies: 9,
    created: new Date("2023-09-18"),
  };

  books.set(book1.isbn, book1);
  books.set(book2.isbn, book2);
  books.set(book3.isbn, book3);
  books.set(book4.isbn, book4);
  books.set(book5.isbn, book5);
  books.set(book6.isbn, book6);
  books.set(book7.isbn, book7);
  books.set(book8.isbn, book8);
  books.set(book9.isbn, book9);
  books.set(book10.isbn, book10);
};
