import { uuid, timestamp } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp().defaultNow().notNull();
export const updatedAt = timestamp()
  .defaultNow()
  .notNull()
  .$onUpdate(() => new Date());
export const deletedAt = timestamp();
