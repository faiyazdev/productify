// product.schema.ts
import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  imageUrl: z.string().url(),
});

export const updateProductSchema = createProductSchema.partial();
