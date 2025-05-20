import { MAX_CHECKOUTS } from "../constants";
import { checkouts } from "../data/stores";
import { Checkout } from "../models/checkoutModel";
import { getBookByIsbn, reduceCopies } from "./bookService";
import { MaxCheckoutsError, NotFoundError } from "./errors";

export const createCheckout = (
  customerId: string,
  isbn: string,
  dueDate: string
): Checkout => {
  if (getCheckoutsForCustomer(customerId).length >= MAX_CHECKOUTS) {
    throw new MaxCheckoutsError();
  }

  reduceCopies(isbn, 1);
  const book = getBookByIsbn(isbn);

  // generate an id between 000001 and 999999
  const randomId = `CKO${String(
    Math.floor(Math.random() * 999999) + 1
  ).padStart(6, "0")}`;

  const newCheckout: Checkout = {
    isbn,
    customer_id: customerId,
    checkout_id: randomId,
    checkout_date: new Date(),
    due_date: new Date(dueDate),
    title: book.title,
  };

  checkouts.set(newCheckout.checkout_id, newCheckout);
  return newCheckout;
};

export const deleteCheckout = (isbn: string, customerId: string) => {
  const checkoutsForCustomer = getCheckoutsForCustomer(customerId);
  const checkout = checkoutsForCustomer.find((checkout) => checkout.isbn === isbn);
  if (!checkout) {
    throw new NotFoundError("This book is not checked out by this customer.");
  }
  checkouts.delete(checkout.checkout_id);
};

export const getCheckoutsForCustomer = (customerId: string): Checkout[] => {
  const customerCheckouts = [];
  for (const checkout of checkouts.values()) {
    if (checkout.customer_id === customerId) {
      customerCheckouts.push(checkout);
    }
  }
  return customerCheckouts;
};
