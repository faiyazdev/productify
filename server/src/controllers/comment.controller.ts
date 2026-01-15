import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { createCommentSchema } from "../schemas/comment.schema.js";
import {
  deleteCommentForProduct,
  insertComment,
} from "../services/comment.service.js";
import handleAsync from "../utils/handleAsync.js";

export const createComment = handleAsync(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const parsedData = createCommentSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ error: "Invalid input data for creating comment" });
    }
    const { content } = parsedData.data;
    const productId = req.params.productId as string;

    if (!productId) {
      return res
        .status(400)
        .json({ error: "product id is required for creating a comment" });
    }

    try {
      const comment = await insertComment(productId, userId!, content);
      return res.status(201).json({ comment });
    } catch (e) {
      if ((e as Error).message === "Failed")
        return res.status(404).send("Failed to create comment");
      throw e;
    }
  }
);

export const deleteComment = handleAsync(
  async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    const productId = req.params.productId as string;

    if (!productId) {
      return res.status(400).send("Product ID is required");
    }

    try {
      await deleteCommentForProduct(productId, userId!);
    } catch (e) {
      if ((e as Error).message === "NOT_FOUND")
        return res.status(404).send("Comment not found");
      if ((e as Error).message === "FORBIDDEN")
        return res.status(403).send("Forbidden");
      throw e;
    }
    return res.status(200).send("Comment deleted successfully");
  }
);
