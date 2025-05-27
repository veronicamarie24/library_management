import { returns } from "../data/stores";
import { Return } from "../models/returnModel";
import { increaseCopies } from "./bookService";
import { deleteCheckout } from "./checkoutService";

export const createReturn = (isbn: string, customerId: string): Return => {
  // generate an id between 000001 and 999999
  const randomId = `RTN${String(
    Math.floor(Math.random() * 999999) + 1
  ).padStart(6, "0")}`;

  increaseCopies(isbn, 1);
  deleteCheckout(isbn, customerId);

  const createdReturn: Return = {
    return_id: randomId,
    isbn,
    customer_id: customerId,
    return_date: new Date(),
  };
  returns.set(randomId, createdReturn);

  return createdReturn;
};
