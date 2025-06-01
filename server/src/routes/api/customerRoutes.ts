import { Router } from "express";
import {
  createCustomer,
  getCheckedOutBooks,
  getCustomerById,
} from "../../controllers/customerController";

const router = Router();

router.post("/", createCustomer);
router.get("/:customer_id", getCustomerById);
router.get("/:customer_id/books", getCheckedOutBooks);

export default router;
