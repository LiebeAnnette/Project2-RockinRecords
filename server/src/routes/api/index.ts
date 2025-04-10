import { Router } from "express";
import recordsRoutes from "./records";
import loginRoute from "./login";

const router = Router();

router.use("/records", recordsRoutes);
router.use("/", loginRoute);

export default router;
