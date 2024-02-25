import {
  decimal,
  float,
  int,
  json,
  mysqlTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import { USERS_TABLE } from '../consts';

export const users = mysqlTable(USERS_TABLE, {
  id: serial('id').primaryKey(),
  userName: text('user_name').notNull(),
  email: text('email').notNull().unique(),
  balance: float('balance').default(0),
});
