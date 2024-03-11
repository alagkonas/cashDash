import { db } from '@/db/db';
import { transactions } from '@/db/schemas/transactions';
import { users } from '@/db/schemas/users';
import { asc, desc, eq } from 'drizzle-orm';
import { sortBy } from 'lodash';
import { PAGINATION_LIMIT } from './consts';

export const getUserTransactions = async (userId: number | undefined) => {
  if (!userId) return null;

  const userTransactions = await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
  });

  const recentTransactions = sortBy(userTransactions, 'createdAt').slice(0, 5);

  return { transactions: userTransactions, recentTransactions };
};

export const getUserRecentTransactions = async (userId: number | undefined) => {
  if (!userId) return null;

  return await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: desc(transactions.createdAt),
    limit: 5,
  });
};

export const getTransaction = async (transactionId: number | undefined) => {
  if (!transactionId) return null;

  return await db.query.transactions.findFirst({
    where: eq(transactions.id, transactionId),
  });
};

export const getUserTransactionHistory = async (
  userId: number | undefined,
  page: number
) => {
  if (!userId) return null;

  return await db.query.transactions.findMany({
    where: eq(transactions.userId, userId),
    orderBy: desc(transactions.createdAt),
    limit: PAGINATION_LIMIT,
    offset: page,
  });
};
