import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { connectToDatabase } from "./models/index";
import routes from "./routes/index";
import recordsRoute from "./routes/api/records";

routes.use("/", recordsRoute);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static frontend from client/dist
app.use(express.static(path.resolve(__dirname, "..", "..", "client", "dist")));

// Fallback to index.html for React Router
app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "client", "dist", "index.html"));
});

// Routes
app.use("/api", routes);

// ✅ Health check route
app.get("/api/status", (req, res) => {
  res.json({ message: "API is up and running 🚀" });
});

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
    const response = await fetch(
      `https://api.deezer.com/genre/${genreId}/artists`
    );
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
    const response = await fetch(
      `https://api.deezer.com/artist/${artistId}/top?limit=10`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching top tracks:", err);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});

// Root route
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "..", "client", "dist", "index.html"));
});

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
