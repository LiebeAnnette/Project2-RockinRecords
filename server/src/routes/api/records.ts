import express from "express";
import Record from "../../models/record";
import { authenticateToken, AuthRequest } from "../../middleware/auth";
const router = express.Router();

// GET /api/records – Get all records for a user (temp: all records)
router.get("/", async (req, res) => {
  try {
    const records = await Record.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});

// POST /api/records – Add a new record
router.post("/", async (req, res) => {
  try {
    const { title, artist, userId } = req.body;

    if (!title || !artist || !userId) {
      return res
        .status(400)
        .json({ message: "Title, artist, and userId are required." });
    }

    const newRecord = await Record.create({
      title,
      artist,
      userId,
    });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Error creating record", error });
  }
});

router.get("/library", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user.id;

    const records = await Record.findAll({ where: { userId } });

    res.json(records);
  } catch (err) {
    console.error("Error fetching user records:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

export default router;
