import { Book } from "../models/bookModel";
import { Checkout } from "../models/checkoutModel";
import { Customer } from "../models/customerModel";

export function isCustomer(customer: any): customer is Customer {
  return (
    typeof customer.customer_id === "string" &&
    typeof customer.name === "string" &&
    typeof customer.email === "string"
  );
}

export type GetCustomerByIdParams = Pick<Customer, "customer_id">;
export function isGetCustomerByIdParams(
  params: any
): params is GetCustomerByIdParams {
  return typeof params.customer_id === "string";
}

export type GetCheckedOutBooksParams = Pick<Customer, "customer_id">;
export function isGetCheckedOutBooksParams(
  params: any
): params is GetCheckedOutBooksParams {
  return typeof params.customer_id === "string";
}

export type GetCheckedOutBooksResponse = {
  isbn: Checkout["isbn"];
  title: Checkout["title"];
  checkout_date: string;
  due_date: string;
  author: Book["author"];
}[];
