export interface Book {
  isbn: string;
  title: string;
  author: string;
  copies: number;
  availableCopies: number;
}

export type BookFilter = Omit<Book, "copies" | "availableCopies">;
