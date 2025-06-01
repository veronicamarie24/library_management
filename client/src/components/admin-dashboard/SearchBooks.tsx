import { useEffect, useState } from "react";
import type { Book, BookFilter } from "../../types/books";
import { API_ROUTES } from "../../routes/serverRoutes";
import "../../styles/SearchBooks.css";

export function SearchBooks() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<BookFilter>({
    title: "",
    author: "",
    isbn: "",
  });
  const [books, setBooks] = useState<Book[]>([]);

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting", formData);
    e.preventDefault();
    const fetchBooksUrl = new URL(API_ROUTES.BOOKS);
    fetchBooksUrl.searchParams.set("author", formData.author);
    fetchBooksUrl.searchParams.set("title", formData.title);
    fetchBooksUrl.searchParams.set("isbn", formData.isbn);

    try {
      const response = await fetch(fetchBooksUrl, {
        method: "GET",
      });
      const data = (await response.json()) as Book[];
      setBooks(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred."
      );
    }
  };

  const handleChangeFormField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmitSearch}>
        <div className="search-form-field">
          <label className="search-form-label">Author</label>
          <input
            name="author"
            value={formData.author}
            onChange={handleChangeFormField}
            className="search-form-input"
          />
        </div>

        <div className="search-form-field">
          <label className="search-form-label">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChangeFormField}
            className="search-form-input"
          />
        </div>

        <div className="search-form-field">
          <label className="search-form-label">Isbn</label>
          <input
            name="isbn"
            value={formData.isbn}
            onChange={handleChangeFormField}
            className="search-form-input"
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Search</button>
      </form>

      <div>
        {books.map((book) => (
          <div className="book-entry" key={book.isbn}>
            <div>{book.title}</div> by <div>{book.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
