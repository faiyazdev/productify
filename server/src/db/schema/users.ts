import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelper.js";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const UserRoleEnum = pgEnum("user_role", userRoles);

export const UsersTable = pgTable("users", {
  id,
  clerkId: text().notNull().unique(),
  email: text().notNull().unique(),
  role: UserRoleEnum().default("user").notNull(),
  name: text(),
  imageUrl: text(),
  createdAt,
  updatedAt,
  deletedAt,
});
