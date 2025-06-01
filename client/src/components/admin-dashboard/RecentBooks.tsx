import { useEffect, useState } from "react";
import type { Book, BookFilter } from "../../types/books";
import { API_ROUTES } from "../../routes/serverRoutes";

export function SearchBooks() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookFilter, setBookFilter] = useState<BookFilter>({
    title: "",
    author: "",
    isbn: "",
    availableCopies: 0,
  });
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_ROUTES.BOOKS, {
          method: "GET",
        });

        const books = (await response.json()) as Book[];
        setBooks(books);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <input name="author" value={bookFilter.author} />

      <input name="title" value={bookFilter.title} />

      <input name="isbn" value={bookFilter.isbn} />

      <input name="availableCopies" value={bookFilter.availableCopies} />
    </div>
  );
}
