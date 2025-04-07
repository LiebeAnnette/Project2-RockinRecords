import { Router } from "express";
import recordsRoutes from "./records";

const router = Router();

router.use("/records", recordsRoutes);

export default router;
