## Resources
Books
Customers
Checkouts
Returns

## Assumptions
- `returns` is a separate data store.
Instead of adding a returned_at field to the `checkout` model, I created a separate store and model for `returns`.
This is to allow for further metadata to be stored there and for better separation of concerns.

- A customer can checkout multiple copies of the same book.
If the customer has multiple copies checked out of the same book and returns one of them, it returns the one that was checked out first.