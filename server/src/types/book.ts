import { Book } from "../models/bookModel";

export type CreateBookBody = Omit<Book, "available_copies">;
export function isCreateBookBody(body: any): body is CreateBookBody {
  return (
    typeof body.isbn === "string" &&
    typeof body.title === "string" &&
    typeof body.author === "string" &&
    typeof body.copies === "number"
  );
}

export type GetBookByIsbnParams = Pick<Book, "isbn">;
export function isGetBookByIsbnParams(
  params: any
): params is GetBookByIsbnParams {
  return typeof params.isbn === "string";
}

export type GetBooksQuery = {
  author?: string;
  title?: string;
  isbn?: string;
  sortBy?: "created" | "author" | "title" | "isbn";
  order?: "asc" | "desc";
  limit?: string;
};
export function isGetBooksQuery(query: any): query is GetBooksQuery {
  const validSortValues = ["created", "author", "title", "isbn"];
  const validOrderValues = ["asc", "desc"];

  return (
    (query.author === undefined || typeof query.author === "string") &&
    (query.title === undefined || typeof query.title === "string") &&
    (query.isbn === undefined || typeof query.isbn === "string") &&
    (query.sort === undefined || validSortValues.includes(query.sort)) &&
    (query.order === undefined || validOrderValues.includes(query.order)) &&
    (query.limit === undefined || typeof query.limit === "string")
  );
}
export type BookQueryOptions = {
  author?: string;
  title?: string;
  isbn?: string;
  sortBy?: "created" | "author" | "title" | "isbn";
  order?: "asc" | "desc";
  limit?: number;
};

export type GetBooksResponse = (Omit<Book, "available_copies"> & {
  availableCopies: number;
})[];
