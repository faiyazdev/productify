import { uuid, timestamp, integer } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp("created_at").defaultNow().notNull();
export const updatedAt = timestamp("updated_at")
  .defaultNow()
  .notNull()
  .$onUpdate(() => new Date());
export const deletedAt = timestamp("deleted_at");
export const priceInCents = integer("price_in_cents").notNull();
