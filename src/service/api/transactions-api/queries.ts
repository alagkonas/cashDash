import { db } from '@/db/db';
import { transactions } from '@/db/schemas/transactions';
import { users } from '@/db/schemas/users';
import { eq } from 'drizzle-orm';
import { sortBy } from 'lodash';

export const getUserTransactions = async (userId: number | undefined) => {
  if (!userId) return null;

  const userTransactions = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
  });

  const recentTransactions = sortBy(userTransactions, 'createdAt').slice(0, 5);

  console.log({ transactions: userTransactions, recentTransactions });

  return { transactions: userTransactions, recentTransactions };
};

export const getUsers = async () => {
  return db.select().from(users);
};
