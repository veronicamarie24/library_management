import { Request, Response } from "express";
import * as bookService from "../services/bookService";
import { Book } from "../models/bookModel";
import {
  CreateBookBody,
  GetBookByIsbnParams,
  isCreateBookBody,
  isGetBookByIsbnParams,
} from "../types";
import {
  NotFoundError,
  standardErrorMessage,
  ErrorResponse,
  InvalidRequestParamsError,
  InvalidRequestBodyError,
} from "../services/errors";

export const getBooks = (req: Request, res: Response<Book[]>) => {
  const allBooks = bookService.getAllBooks();
  res.status(200).json(allBooks);
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
    if (err instanceof InvalidRequestParamsError) {
      res.status(400).json({ errorMessage: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({ errorMessage: err.message });
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
    if (err instanceof InvalidRequestBodyError) {
      res.status(400).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};
