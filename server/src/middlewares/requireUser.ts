import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { getUserByClerkId } from "../services/product.service.js";

export async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { userId: clerkId } = getAuth(req);

  if (!clerkId) {
    // This should never happen if requireAuth() is present
    res.status(401).send("Unauthorized");
    return;
  }

  const user = await getUserByClerkId(clerkId);

  if (!user) {
    res.status(401).send("User not found");
    return;
  }

  req.user = user;
  next();
}
