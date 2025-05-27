import { Router } from "express";
import { createReturn } from "../controllers/returnController.ts.js";

const router = Router();

router.post("/", createReturn);

export default router;
