import { Router } from "express";
import { createReturn } from "../controllers/returnController";

const router = Router();

router.post("/", createReturn);

export default router;
