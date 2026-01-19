import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { CommentsTable, ProductsTable } from "../db/schema.js";

export const insertComment = async (
  productId: string,
  userId: string,
  content: string,
) => {
  const [createComment] = await db
    .insert(CommentsTable)
    .values({
      productId,
      userId,
      content,
    })
    .returning();

  if (!createComment) {
    throw new Error("Failed");
  }

  return createComment;
};
export const deleteCommentForProduct = async (
  productId: string,
  userId: string,
) => {
  const product = await db.query.ProductsTable.findFirst({
    where: eq(ProductsTable.id, productId),
  });

  if (!product) {
    throw new Error("Product not found, failed to delete comment");
  }

  const comment = await db.query.CommentsTable.findFirst({
    where: eq(CommentsTable.productId, productId),
  });
  if (!comment) {
    throw new Error("Comment not found, failed to delete comment");
  }

  if (comment.userId !== userId) {
    throw new Error("FORBIDDEN, you are not the author of the comment");
  }

  await db.delete(CommentsTable).where(eq(CommentsTable.id, comment.id));

  return comment;
};
