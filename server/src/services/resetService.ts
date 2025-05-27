import { books, checkouts, customers, returns } from "../data/stores"

export const resetStores = () => {
  books.clear();
  customers.clear();
  checkouts.clear();
  returns.clear();
}