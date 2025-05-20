import { Book } from "../models/bookModel";
import { Checkout } from "../models/checkoutModel";
import { Customer } from "../models/customerModel";
import { Return } from "../models/returnModel";

// Key: isbn
export const books = new Map<string, Book>();

// Key: customer_id
export const customers = new Map<string, Customer>();

// Key: checkout_id
export const checkouts = new Map<string, Checkout>();

// Key: return_id
export const returns = new Map<string, Return>();
