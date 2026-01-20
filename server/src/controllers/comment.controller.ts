import type { Request, Response } from "express";
import { createCommentSchema } from "../schemas/comment.schema.js";
import {
  deleteCommentForProduct,
  insertComment,
} from "../services/comment.service.js";
import handleAsync from "../utils/handleAsync.js";
import { getParam } from "../utils/getParam.js";

export const createComment = handleAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const parsedData = createCommentSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ error: "Invalid input data for creating comment" });
    }

    const productId = getParam(req.params.productId);
    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required",
      });
    }

    const { content } = parsedData.data;

    const comment = await insertComment(productId, userId, content);
    return res.status(201).json(comment);
  },
);

export const deleteComment = handleAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const productId = getParam(req.params.productId);
    const commentId = getParam(req.params.commentId);
    if (!productId) {
      return res.status(400).send("Product ID is required");
    }
    if (!commentId) {
      return res.status(400).send("Comment ID is required");
    }

    await deleteCommentForProduct(commentId, productId, userId);
    return res.status(200).send("Comment deleted successfully");
  },
);
