import { requireAuth } from "@clerk/express";
import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.route("/").get(getProducts).post(requireAuth(), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(requireAuth(), updateProduct)
  .delete(requireAuth(), deleteProduct);

export default router;
