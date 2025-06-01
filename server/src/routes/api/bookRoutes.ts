import { Router } from "express";
import {
  createBook,
  getBookByIsbn,
  getBooks,
} from "../../controllers/bookController";
import { authenticate, authorize } from "../../middleware/auth";

const router = Router();

router.post("/", authenticate, authorize("admin"), createBook);
router.get("/", getBooks);
router.get("/:isbn", getBookByIsbn);

export default router;
