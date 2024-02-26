import { relations } from 'drizzle-orm';
import { transactions } from './transactions';
import { users } from './users';

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));
