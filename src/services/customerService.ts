import { customers } from "../data/stores";
import { Customer } from "../models/customerModel";
import { NotFoundError } from "./errors";
import { getCheckoutsForCustomer } from "./checkoutService";
import { Checkout } from "../models/checkoutModel";
import { Book } from "../models/bookModel";
import { getBooksByIsbn } from "./bookService";

export const getCustomerById = (
  customerId: Customer["customer_id"]
): Customer => {
  const customer = customers.get(customerId);
  if (!customer) throw new NotFoundError(`Customer not found.`);
  return customer;
};

export const createCustomer = (newCustomer: Customer): Customer => {
  customers.set(newCustomer.customer_id, newCustomer);
  return newCustomer;
};

export const getCheckedOutBooks = (
  customerId: Customer["customer_id"]
): Array<Checkout & { author: Book["author"] }> => {
  const checkouts = getCheckoutsForCustomer(customerId);
  const books = getBooksByIsbn(checkouts.map((checkout) => checkout.isbn));
  return checkouts.map((checkout) => {
    const book = books.get(checkout.isbn);
    if (!book)
      throw new NotFoundError(`Book with ISBN ${checkout.isbn} not found.`);
    return {
      ...checkout,
      author: book.author,
    };
  });
};
