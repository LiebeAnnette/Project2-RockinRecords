import { Request, Response } from "express";

const records = [
  { id: 1, album: "Rumours", artist: "Fleetwood Mac" },
  { id: 2, album: "Abbey Road", artist: "The Beatles" },
];

const getAllRecords = (_req: Request, res: Response) => {
  res.json(records);
};

const createRecord = (req: Request, res: Response) => {
  const { album, artist } = req.body;

  if (!album || !artist) {
    res.status(400).json({ error: "Album and artist are required" });
    return;
  }

  const newRecord = {
    id: records.length + 1,
    album,
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
