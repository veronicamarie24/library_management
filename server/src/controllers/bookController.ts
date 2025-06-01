import { Request, Response } from "express";
import * as bookService from "../services/bookService";
import { Book } from "../models/bookModel";
import {
  GetBooksResponse,
  CreateBookBody,
  GetBookByIsbnParams,
  isCreateBookBody,
  isGetBookByIsbnParams,
  isGetBooksQuery,
  GetBooksQuery,
} from "../types";
import {
  standardErrorMessage,
  ErrorResponse,
  InvalidRequestParamsError,
  InvalidRequestBodyError,
  AppError,
  InvalidRequestQueryError,
} from "../types/errors";

export const getBooks = (
  req: Request<{}, {}, {}, GetBooksQuery>,
  res: Response<GetBooksResponse | ErrorResponse>
) => {
  try {
    const query = req.query;
    if (!isGetBooksQuery(query)) {
      throw new InvalidRequestQueryError();
    }

    const { author, title, isbn, limit: strLimit, sortBy, order } = query;
    const limit = Number(strLimit) || undefined;
    console.log(query);

    const books = bookService.getBooks({
      author,
      title,
      isbn,
      limit,
      sortBy,
      order,
    });
    const bookResponse: GetBooksResponse = books.map((book) => {
      const { available_copies, ...rest } = book;
      return { ...rest, availableCopies: book.available_copies };
    });
    res.status(200).json(bookResponse);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};

export const getBookByIsbn = (
  req: Request<GetBookByIsbnParams>,
  res: Response<Book | ErrorResponse>
) => {
  try {
    const params = req.params;
    if (!isGetBookByIsbnParams(params)) {
      throw new InvalidRequestParamsError();
    }

    const { isbn } = params;
    const book = bookService.getBookByIsbn(isbn);
    res.status(200).json(book);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};

export const createBook = (
  req: Request<{}, {}, CreateBookBody>,
  res: Response<Book | ErrorResponse>
) => {
  try {
    const body = req.body;
    if (!isCreateBookBody(body)) {
      throw new InvalidRequestBodyError();
    }

    const { isbn, title, author, copies } = body;
    const book = bookService.createBook(isbn, title, author, copies);
    res.status(201).json(book);
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};
