import { Return } from "../models/returnModel";

export type CreateReturnBody = Pick<Return, "isbn" | "customer_id">;
export function isCreateReturnBody(body: any): body is CreateReturnBody {
  return typeof body.isbn === "string" && typeof body.customer_id === "string";
}

export type CreateReturnResponse = Omit<Return, "return_id" | "return_date"> & {
  return_date: string;
  message: string;
};
