import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { clerkMiddleware } from "@clerk/express";
import clerkRoutes from "./routes/clerk.routes.js";
import productRoutes from "./routes/product.routes.js";
import type { NextFunction, Request, Response } from "express";

const app = express();

// middlewares
app.use(clerkMiddleware());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", env.FRONTEND_URL],
    credentials: true, // Allow cookies
  }),
);

// routes

app.use("/api/webhooks", clerkRoutes);
app.use("/api/products", productRoutes);

app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  const message = err.message || "Something went wrong";

  res.json({
    success: false,
    message,
    stack: err.stack ? err.stack : {},
  });
});

export default app;
