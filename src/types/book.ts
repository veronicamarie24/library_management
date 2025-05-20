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
