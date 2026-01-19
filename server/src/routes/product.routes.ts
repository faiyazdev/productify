import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { requireUser } from "../middlewares/requireUser.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(requireAuth(), requireUser, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(requireAuth(), requireUser, updateProduct)
  .delete(requireAuth(), requireUser, deleteProduct);

export default router;
