import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router
  .route("/:productId")
  .post(requireAuth(), createComment)
  .delete(requireAuth(), deleteComment);

export default router;
