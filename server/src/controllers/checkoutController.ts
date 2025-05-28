import { Request, Response } from "express";
import {
  CreateCheckoutBody,
  CreateCheckoutResponse,
  isCreateCheckoutBody,
} from "../types";
import * as checkoutService from "../services/checkoutService";
import {
  NotFoundError,
  standardErrorMessage,
  ErrorResponse,
  InvalidRequestBodyError,
  AppError,
} from "../types/errors";
import { formatDate } from "../util/formatters";

export const createCheckout = (
  req: Request<{}, {}, CreateCheckoutBody>,
  res: Response<CreateCheckoutResponse | ErrorResponse>
) => {
  try {
    const body = req.body;
    if (!isCreateCheckoutBody(body)) {
      throw new InvalidRequestBodyError();
    }

    const { isbn, customer_id, due_date } = body;
    const checkout = checkoutService.createCheckout(
      customer_id,
      isbn,
      due_date
    );
    res.status(201).json({
      ...checkout,
      checkout_date: formatDate(checkout.checkout_date),
      due_date: formatDate(checkout.due_date),
    });
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ errorMessage: err.message });
    } else {
      res.status(500).json({ errorMessage: standardErrorMessage });
    }
  }
};
