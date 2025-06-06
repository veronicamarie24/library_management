import { Router } from "express";
import bookRoutes from "./bookRoutes";
import customerRoutes from "./customerRoutes";
import checkoutRoutes from "./checkoutRoutes";
import returnRoutes from "./returnRoutes";
import resetRoutes from "./resetRoutes";

const router = Router();

router.use("/books", bookRoutes);
router.use("/customers", customerRoutes);
router.use("/checkouts", checkoutRoutes);
router.use("/returns", returnRoutes);
router.use("/reset", resetRoutes);

export default router;
