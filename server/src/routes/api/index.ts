import { Router } from "express";
import recordsRoutes from "./records.ts";

const router = Router();

router.use("/records", recordsRoutes);

export default router;
