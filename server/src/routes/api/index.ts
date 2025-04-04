import { Router } from "express";
import recordController from "../../controllers/recordController.js";

const router = Router();

// GET all records
router.get("/records", recordController.getAllRecords);

// POST a new record
router.post("/records", recordController.createRecord);

export default router;
