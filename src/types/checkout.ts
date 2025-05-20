import { Checkout } from "../models/checkoutModel";

export type CreateCheckoutBody = Pick<Checkout, "isbn" | "customer_id"> & {
  due_date: string;
};
export function isCreateCheckoutBody(body: any): body is CreateCheckoutBody {
  return (
    typeof body.isbn === "string" &&
    typeof body.customer_id === "string" &&
    typeof body.due_date === "string"
  );
}

export type CreateCheckoutResponse = Omit<
  Checkout,
  "due_date" | "checkout_date"
> & {
  checkout_date: string;
  due_date: string;
};
