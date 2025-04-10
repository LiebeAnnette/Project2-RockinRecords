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
    const { album, artist, userId } = req.body;

    if (!album || !artist || !userId) {
      return res
        .status(400)
        .json({ message: "Album, artist, and userId are required." });
    }

    const newRecord = await Record.create({
      album,
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

router.delete("/:id", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const recordId = req.params.id;
    const userId = req.user.id;

    const record = await Record.findOne({ where: { id: recordId, userId } });

    if (!record) {
      return res.status(404).json({ message: "Record not found or unauthorized." });
    }

    await record.destroy();
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ message: "Failed to delete record." });
  }
});

export default router;
