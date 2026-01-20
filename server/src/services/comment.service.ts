import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { CommentsTable } from "../db/schema.js";

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
    throw new Error("Failed to create comment");
  }

  return createComment;
};
export const deleteCommentForProduct = async (
  commentId: string,
  productId: string,
  userId: string,
) => {
  const comment = await db.query.CommentsTable.findFirst({
    where: eq(CommentsTable.id, commentId),
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.productId !== productId) {
    throw new Error("Comment does not belong to this product");
  }

  if (comment.userId !== userId) {
    throw new Error("Forbidden, you are not the author of the comment");
  }

  await db.delete(CommentsTable).where(eq(CommentsTable.id, commentId));

  return comment;
};
