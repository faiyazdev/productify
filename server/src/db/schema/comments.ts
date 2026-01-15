import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper.js";
import { UsersTable } from "./users.js";
import { relations } from "drizzle-orm";
import { ProductsTable } from "./products.js";

export const CommentsTable = pgTable("comments", {
  id,
  content: text().notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => ProductsTable.id),
  userId: uuid("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  createdAt,
  updatedAt,
});

export const commentsRelations = relations(CommentsTable, ({ one }) => ({
  owner: one(UsersTable, {
    fields: [CommentsTable.userId],
    references: [UsersTable.id],
  }),
  product: one(ProductsTable, {
    fields: [CommentsTable.productId],
    references: [ProductsTable.id],
  }),
}));
