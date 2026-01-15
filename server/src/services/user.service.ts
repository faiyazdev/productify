import { eq } from "drizzle-orm";
import { UsersTable } from "../db/schema.js";
import db from "../db/index.js";

export const insertUser = async (data: typeof UsersTable.$inferInsert) => {
  const [user] = await db.insert(UsersTable).values(data).returning();
  return user;
};
export async function updateUser(
  clerkId: string,
  data: Partial<typeof UsersTable.$inferInsert>
) {
  const [updatedUser] = await db
    .update(UsersTable)
    .set({
      email: data.email,
      name: data.name,
      imageUrl: data.imageUrl,
      role: data.role,
    })
    .where(eq(UsersTable.clerkId, clerkId))
    .returning();

  return updatedUser;
}
export const deleteUser = async (clerkId: string) => {
  const [deletedUser] = await db
    .update(UsersTable)
    .set({
      id: undefined,
      email: `deleted-${Date.now()}@example.com`,
      name: "deleted name",
      imageUrl: "delted image path",
      deletedAt: new Date(),
    })
    .where(eq(UsersTable.clerkId, clerkId))
    .returning();

  return deletedUser;
};

export const upsertUser = async (data: typeof UsersTable.$inferInsert) => {
  const [user] = await db
    .insert(UsersTable)
    .values(data)
    .onConflictDoUpdate({
      target: UsersTable.clerkId,
      set: {
        email: data.email,
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl,
      },
    })
    .returning();
  return user;
};
