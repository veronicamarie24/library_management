import { Router } from "express";
import {
  createBook,
  getBookByIsbn,
  getBooks,
} from "../controllers/bookController";

const router = Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:isbn", getBookByIsbn);

export default router;
