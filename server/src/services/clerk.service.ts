import { clerkClient } from "@clerk/express";
import { UsersTable } from "../db/schema/users.js";

export const syncClerkMetaData = async (
  clerkId: string,
  user: typeof UsersTable.$inferInsert
) => {
  const client = clerkClient;
  client.users.updateUser(clerkId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
};
