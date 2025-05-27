import { Request, Response } from "express";
import { Customer } from "../models/customerModel";
import * as customerService from "../services/customerService";
import {
  GetCheckedOutBooksParams,
  GetCheckedOutBooksResponse,
  GetCustomerByIdParams,
  isCustomer,
  isGetCheckedOutBooksParams,
} from "../types";
import {
  NotFoundError,
  standardErrorMessage,
  ErrorResponse,
  InvalidRequestParamsError,
  InvalidRequestBodyError,
} from "../services/errors";
import { formatDate } from "../util";

export const getCustomerById = (
  req: Request<GetCustomerByIdParams>,
  res: Response<Customer | ErrorResponse>
) => {
  try {
    const params = req.params;
    if (!isGetCheckedOutBooksParams(params)) {
      throw new InvalidRequestParamsError();
    }

    const { customer_id } = params;
    const customer = customerService.getCustomerById(customer_id);
    res.status(200).json(customer);
  } catch (err) {
    if (err instanceof InvalidRequestParamsError) {
      res.status(400).json({ errorMessage: err.message });
    } else if (err instanceof NotFoundError) {
      res.status(404).json({
        errorMessage: err.message,
      });
    } else {
      res.status(500).json({
        errorMessage: standardErrorMessage,
      });
    }
  }
};

export const createCustomer = (
  req: Request<{}, {}, Customer>,
  res: Response<Customer | ErrorResponse>
) => {
  try {
    const body = req.body;
    if (!isCustomer(body)) {
      throw new InvalidRequestBodyError();
    }

    const newCustomer = customerService.createCustomer(body);
    res.status(201).json(newCustomer);
  } catch (err) {
    if (err instanceof InvalidRequestBodyError) {
      res.status(400).json({ errorMessage: err.message });
    } else {
      res.status(500).json({
        errorMessage: standardErrorMessage,
      });
    }
  }
};

export const getCheckedOutBooks = (
  req: Request<GetCheckedOutBooksParams>,
  res: Response<GetCheckedOutBooksResponse | ErrorResponse>
) => {
  try {
    const params = req.params;
    if (!isGetCheckedOutBooksParams(params)) {
      throw new InvalidRequestParamsError();
    }

    const { customer_id } = params;
    const checkedOutBooks = customerService.getCheckedOutBooks(customer_id);
    const response: GetCheckedOutBooksResponse = checkedOutBooks.map(
      (checkout) => {
        return {
          isbn: checkout.isbn,
          title: checkout.title,
          checkout_date: formatDate(checkout.checkout_date),
          due_date: formatDate(checkout.due_date),
          author: checkout.author,
        };
      }
    );
    res.status(200).json(response);
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
