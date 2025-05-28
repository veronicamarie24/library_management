import { Router } from "express";
import {
  createBook,
  getBookByIsbn,
  getBooks,
} from "../controllers/bookController";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "../types/auth";

const router = Router();

router.post("/", authenticate, authorize(Role.ADMIN), createBook);
router.get("/", getBooks);
router.get("/:isbn", getBookByIsbn);

export default router;
