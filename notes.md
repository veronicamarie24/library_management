# Assumptions and Tradeoffs
## Books
- Adding a book with 0 copies is allowed

- Book creation with an existing `isbn` value will override the existing record

## Customers
- Customer creation with an existing `customer_id` value will override the existing record


## Checkouts
- A customer can checkout multiple copies of the same book.
  - If the customer has multiple copies checked out of the same book and returns one of them, it returns the one that was checked out first.

- Checking out a book with an insufficient number of `available_copies` results in an error.

## Returns
- Returning a book that doesn't exist results in an error.

- Returning a book that isn't checked out by the customer specified results in an error.

- Returning a book deletes the checkout record corresponding to the book and customer.