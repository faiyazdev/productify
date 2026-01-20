import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  myProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { requireUser } from "../middlewares/requireUser.js";
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(requireAuth(), requireUser, createProduct);

router.get("/me", requireAuth(), requireUser, myProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(requireAuth(), requireUser, updateProduct)
  .delete(requireAuth(), requireUser, deleteProduct);

export default router;
