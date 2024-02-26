import {
  decimal,
  float,
  mysqlTable,
  serial,
  text,
} from 'drizzle-orm/mysql-core';
import { USERS_TABLE } from '../consts';

export const users = mysqlTable(USERS_TABLE, {
  id: serial('id').primaryKey(),
  userName: text('user_name').notNull(),
  email: text('email').notNull().unique(),
  balance: float('balance').default(0),
});
