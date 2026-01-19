import { eq } from "drizzle-orm";
import type { z } from "zod";
import { ProductsTable, UsersTable } from "../db/schema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";
import db from "../db/index.js";

type CreateProductInput = z.infer<typeof createProductSchema>;
type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const insertProduct = async (
  userId: string,
  data: CreateProductInput,
) => {
  const [product] = await db
    .insert(ProductsTable)
    .values({ ...data, userId })
    .returning();
  return product;
};

export const updateProductById = async (
  productId: string,
  data: UpdateProductInput,
) => {
  const [product] = await db
    .update(ProductsTable)
    .set(data)
    .where(eq(ProductsTable.id, productId))
    .returning();
  return product;
};

export const deleteProductById = async (productId: string) => {
  await db.delete(ProductsTable).where(eq(ProductsTable.id, productId));
};

export const getProductById = async (productId: string) => {
  return await db.query.ProductsTable.findFirst({
    where: eq(ProductsTable.id, productId),
    with: { owner: true },
  });
};
export const getUserByClerkId = async (clerkId: string) => {
  const res = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.clerkId, clerkId),
    columns: {
      id: true,
      clerkId: true,
    },
  });
  return res;
};
export const isProductExist = async (productId: string) => {
  return await db.query.ProductsTable.findFirst({
    where: eq(ProductsTable.id, productId),
  });
};

export const getAllProducts = async () => {
  return await db.query.ProductsTable.findMany({
    with: { owner: true },
  });
};
