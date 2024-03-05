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

export enum TransactionTypeEnum {
  Deposit = 'deposit',
  Expense = 'expense',
}

export const transactions = mysqlTable(TRANSACTIONS_TABLE, {
  id: serial('id').primaryKey(),
  amount: float('amount').notNull(),
  userId: int('user_id').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  type: mysqlEnum('type', [
    TransactionTypeEnum.Deposit,
    TransactionTypeEnum.Expense,
  ]).notNull(),
  description: text('description'),
  recipient: text('recipient'),
  sender: text('sender'),
});
