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
  const priceInCents = Math.round(data.price * 100);
  const [product] = await db
    .insert(ProductsTable)
    .values({ ...data, userId, priceInCents })
    .returning();
  return product;
};

export const updateProductById = async (
  productId: string,
  data: UpdateProductInput,
) => {
  const updateData: Partial<typeof ProductsTable.$inferInsert> = {
    ...data,
  };
  delete (updateData as any).price; //! in drizzle and prisma : if a field has value of undefined it's ignored or untouched. so it's extra protection or something new i learnt

  // ✅ convert only if provided, it's mendatory
  if (data.price !== undefined) {
    updateData.priceInCents = Math.round(data.price * 100);
  }

  const [product] = await db
    .update(ProductsTable)
    .set(updateData)
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
    with: {
      owner: true,
      comments: {
        with: {
          owner: true,
        },
      },
    },
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
export const getMyProducts = async (userId: string) => {
  return await db.query.ProductsTable.findMany({
    with: { owner: true },
    where: eq(ProductsTable.userId, userId),
  });
};
