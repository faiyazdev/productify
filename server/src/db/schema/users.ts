import { pgEnum, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelper.js";
import { relations, sql } from "drizzle-orm";
import { ProductsTable } from "./products.js";
import { CommentsTable } from "./comments.js";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const UserRoleEnum = pgEnum("user_role", userRoles);

export const UsersTable = pgTable(
  "users",
  {
    id,
    clerkId: text("clerk_id").notNull().unique(),
    email: text().notNull().unique(),
    role: UserRoleEnum().default("user").notNull(),
    name: text(),
    imageUrl: text("image_url"),
    createdAt,
    updatedAt,
    deletedAt,
  },
  (table) => [
    uniqueIndex("email_idx")
      .on(table.email)
      .where(sql`${table.deletedAt} IS NULL`),
  ]
);

export const usersRelations = relations(UsersTable, ({ many }) => ({
  products: many(ProductsTable),
  comments: many(CommentsTable),
}));
