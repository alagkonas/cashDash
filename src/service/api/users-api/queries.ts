import { db } from '@/db/db';
import { users } from '@/db/schemas/users';
import { eq } from 'drizzle-orm';

export const getUserData = () => {};

export const getUser = async (userId: number | undefined) => {
  if (!userId) return null;

  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};
