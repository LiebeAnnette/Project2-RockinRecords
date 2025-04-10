import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { connectToDatabase } from "./models/index";

import routes from "./routes/index";
import recordsRoute from "./routes/api/records";
import loginRoute from "./routes/api/login";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Mount API routes FIRST
routes.use("/records", recordsRoute);
routes.use("/login", loginRoute);
app.use(routes);

// ✅ Health check
app.get("/api/status", (req, res) => {
  res.json({ message: "API is up and running 🚀" });
});

// ✅ Deezer API routes
app.get("/api/genres", async (_req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/genre");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

app.get("/api/genre/:genreId/artists", async (req, res) => {
  const { genreId } = req.params;
  try {
    const response = await fetch(`https://api.deezer.com/genre/${genreId}/artists`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

app.get("/api/artist/:artistId/top", async (req, res) => {
  const { artistId } = req.params;
  try {
    const response = await fetch(`https://api.deezer.com/artist/${artistId}/top?limit=10`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

// ✅ Serve frontend LAST
app.use(express.static(path.resolve(__dirname, "..", "..", "client", "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "client", "dist", "index.html"));
});

// ✅ Connect DB and start server
connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
