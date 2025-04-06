// server/src/server.ts
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/index.ts";
import routes from "./routes/index.ts"; // <- use .ts path if running via ts-node

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

app.get("/", (_req, res) => {
  res.send("Rockin Records API is live!");
});

connectToDatabase();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
