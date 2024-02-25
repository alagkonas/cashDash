import {
  mysqlTable,
  int,
  text,
  timestamp,
  serial,
  mysqlEnum,
  float,
} from 'drizzle-orm/mysql-core';
import { TRANSACTIONS_TABLE } from '../consts';
import { users } from './users';

export const transactions = mysqlTable(TRANSACTIONS_TABLE, {
  id: serial('id').primaryKey(),
  amount: float('amount').notNull(),
  userId: int('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  type: mysqlEnum('type', ['deposit', 'expense']),
  description: text('description'),
  recipient: text('recipient'),
  sender: text('sender'),
});
