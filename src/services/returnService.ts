import { returns } from "../data/stores";
import { Return } from "../models/returnModel";
import { increaseCopies } from "./bookService";
import { deleteCheckout } from "./checkoutService";

export const createReturn = (isbn: string, customerId: string): Return => {
  const createdReturn: Return = {
    isbn,
    customer_id: customerId,
    return_date: new Date(),
  };
  returns.set(isbn, createdReturn);
  increaseCopies(isbn, 1);
  deleteCheckout(isbn, customerId);
  return createdReturn;
};
