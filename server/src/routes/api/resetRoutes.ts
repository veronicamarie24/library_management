import { Router } from "express";
import { resetApi } from "../../controllers/resetController";

const router = Router();

router.post("/", resetApi);

export default router;
