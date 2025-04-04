import { Request, Response } from "express";

const records = [
  { id: 1, title: "Rumours", artist: "Fleetwood Mac" },
  { id: 2, title: "Abbey Road", artist: "The Beatles" },
];

const getAllRecords = (_req: Request, res: Response) => {
  res.json(records);
};

const createRecord = (req: Request, res: Response) => {
  const { title, artist } = req.body;

  if (!title || !artist) {
    res.status(400).json({ error: "Title and artist are required" });
    return;
  }

  const newRecord = {
    id: records.length + 1,
    title,
    artist,
  };

  records.push(newRecord);
  res.status(201).json(newRecord);
  return;
};

export default {
  getAllRecords,
  createRecord,
};
