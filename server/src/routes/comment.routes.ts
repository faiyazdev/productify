import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { requireUser } from "../middlewares/requireUser.js";
const router = express.Router();

router
  .route("/:productId")
  .post(requireAuth(), requireUser, createComment)
  .delete(requireAuth(), requireUser, deleteComment);

export default router;
