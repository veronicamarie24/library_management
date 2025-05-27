import { Request, Response } from "express";
import {
  CreateReturnBody,
  CreateReturnResponse,
  isCreateReturnBody,
} from "../types/return";
import * as returnService from "../services/returnService";
import { formatDate } from "../util";
import {
  NotFoundError,
  standardErrorMessage,
  ErrorResponse,
  InvalidRequestBodyError,
} from "../services/errors";

export const createReturn = (
  req: Request<{}, {}, CreateReturnBody>,
  res: Response<CreateReturnResponse | ErrorResponse>
) => {
  try {
    const body = req.body;
    if (!isCreateReturnBody(body)) {
      throw new InvalidRequestBodyError();
    }

    const { isbn, customer_id } = body;
    const createdReturn = returnService.createReturn(isbn, customer_id);

    const returnResponse: CreateReturnResponse = {
      isbn: createdReturn.isbn,
      customer_id: createdReturn.customer_id,
      return_date: formatDate(createdReturn.return_date),
      message: "Book returned successfully",
    };

    res.status(200).json(returnResponse);
  } catch (err) {
    if (err instanceof InvalidRequestBodyError) {
      res.status(400).json({ errorMessage: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({
        errorMessage: err.message,
      });
    }
    if (err instanceof InvalidRequestBodyError) {
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};
