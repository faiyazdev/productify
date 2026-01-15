// product.schema.ts
import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string(),
});

export const updateCommentSchema = createCommentSchema.partial();
