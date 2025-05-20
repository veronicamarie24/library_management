export interface Checkout {
  checkout_id: string;
  isbn: string;
  title: string;
  customer_id: string;
  checkout_date: Date;
  due_date: Date;
}
