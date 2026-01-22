import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  createdAt,
  deletedAt,
  id,
  priceInCents,
  updatedAt,
} from "../schemaHelper.js";
import { UsersTable } from "./users.js";
import { relations } from "drizzle-orm";
import { CommentsTable } from "./comments.js";

export const ProductsTable = pgTable("products", {
  id,
  title: text().notNull(),
  description: text(),
  imageUrl: text("image_url"),
  userId: uuid("user_id")
    .references(() => UsersTable.id)
    .notNull(),
  priceInCents,
  createdAt,
  updatedAt,
  deletedAt,
});

export const productsRelations = relations(ProductsTable, ({ one, many }) => ({
  owner: one(UsersTable, {
    fields: [ProductsTable.userId],
    references: [UsersTable.id],
  }),
  comments: many(CommentsTable),
}));
