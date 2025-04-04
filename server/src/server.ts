// src/server.ts
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

import routes from "./routes/index.js";

app.use(routes);

// Routes
app.get("/", (_req, res) => {
  res.send("Rockin Records API is live!");
});

connectToDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
