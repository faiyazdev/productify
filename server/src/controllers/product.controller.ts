import type { Request, Response } from "express";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";
import {
  deleteProductById,
  getAllProducts,
  getMyProducts,
  getProductById,
  insertProduct,
  isProductExist,
  updateProductById,
} from "../services/product.service.js";
import handleAsync from "../utils/handleAsync.js";
import { getParam } from "../utils/getParam.js";

export const createProduct = handleAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const parsedData = createProductSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ error: "Invalid input data for creating product" });
    }

    const { title, description, imageUrl } = parsedData.data;

    const product = await insertProduct(userId, {
      title,
      description,
      imageUrl,
    });

    return res.status(201).json(product);
  },
);

export const updateProduct = handleAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const productId = getParam(req.params.id);
    if (!productId) {
      return res.status(400).send("Product ID is required");
    }

    const product = await isProductExist(productId);
    if (!product) {
      return res
        .status(400)
        .send("Product not found, failed to update product");
    }

    if (product.userId !== userId) {
      return res.status(403).send("Forbidden");
    }

    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const updatedProduct = await updateProductById(productId, parsed.data);

    return res.status(200).json(updatedProduct);
  },
);

export const deleteProduct = handleAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    const productId = getParam(req.params.id);
    if (!productId) {
      return res.status(400).send("Product ID is required");
    }

    const product = await isProductExist(productId);
    if (!product) {
      return res
        .status(400)
        .send("Product not found, failed to delete product");
    }

    if (product.userId !== userId) {
      return res.status(403).send("Forbidden");
    }

    await deleteProductById(productId);
    return res.status(200).send("Product deleted successfully");
  },
);

export const getProduct = handleAsync(async (req: Request, res: Response) => {
  const productId = getParam(req.params.id);
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }

  const product = await getProductById(productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }

  return res.status(200).json(product);
});

export const getProducts = handleAsync(async (_: Request, res: Response) => {
  const products = await getAllProducts();
  return res.status(200).json(products);
});
export const myProducts = handleAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  const products = await getMyProducts(userId);
  return res.status(200).json(products);
});
