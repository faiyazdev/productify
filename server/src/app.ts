import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", env.FRONTEND_URL],
    credentials: true, // Allow cookies
  })
);

app.get("/", (_, res) => {
  res.send("Home page!");
});
app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: id });
});

export default app;
