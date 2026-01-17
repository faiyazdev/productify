import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";
import {
  deleteProductById,
  getAllProducts,
  getProductById,
  insertProduct,
  isProductExist,
  updateProductById,
} from "../services/product.service.js";

export const createProduct = async (req: Request, res: Response) => {
  // Implementation for creating a product
  const { userId } = getAuth(req);
  const parsedData = createProductSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(400)
      .json({ error: "Invalid input data for creating product" });
  }
  const { title, description, imageUrl } = parsedData.data;

  const product = await insertProduct(userId!, {
    title,
    description,
    imageUrl,
  });
  if (!product) {
    return res.status(500).send("Failed to create product");
  }

  return res.status(201).json(product);
};
export const updateProduct = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const productId = req.params.id as string;
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }

  const product = await isProductExist(productId);
  if (!product) {
    return res.status(400).send("Product not found, failed to update product");
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
};

export const deleteProduct = async (req: Request, res: Response) => {
  // Implementation for deleting a product
  const { userId } = getAuth(req);
  const productId = req.params.id as string;
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }
  const product = await isProductExist(productId);
  if (!product) {
    return res.status(400).send("Product not found, failed to delete product");
  }
  if (product.userId !== userId) {
    return res.status(403).send("Forbidden");
  }
  await deleteProductById(productId);
  return res.status(200).send("Product deleted successfully");
};

export const getProduct = async (req: Request, res: Response) => {
  // Implementation for getting a product by ID
  const productId = req.params.id as string;
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }
  const product = await getProductById(productId);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  return res.status(200).json(product);
};
export const getProducts = async (_: Request, res: Response) => {
  const products = await getAllProducts();
  if (!products) {
    return res.status(404).send("Products not found");
  }
  return res.status(200).json(products);
};
