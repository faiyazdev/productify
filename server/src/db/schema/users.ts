import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, id, updatedAt } from "../schemaHelper";

export const userRoles = ["user", "admin"] as const;
export type userRole = (typeof userRoles)[number];
export const UserRoleEnum = pgEnum("user_role", userRoles);

export const usersTable = pgTable("users", {
  id,
  clerkId: text().notNull().unique(),
  name: text(),
  email: text().notNull().unique(),
  role: UserRoleEnum().default("user").notNull(),
  createdAt,
  updatedAt,
  deletedAt,
});
