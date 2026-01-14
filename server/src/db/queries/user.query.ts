import { eq } from "drizzle-orm";
import db from "../index.js";
import { UsersTable } from "../schema/users.js";

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
      email: "deleted@email.com",
      clerkId: `deleted-clerkUserId-${clerkId}`,
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
        id: data.id,
        clerkId: data.clerkId,
        name: data.name,
        role: "user",
        imageUrl: data.imageUrl,
      },
    })
    .returning();
  return user;
};
