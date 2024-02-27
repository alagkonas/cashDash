import {
  float,
  mysqlTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/mysql-core';
import { USERS_TABLE } from '../consts';

export const users = mysqlTable(USERS_TABLE, {
  id: serial('id').primaryKey(),
  userName: text('user_name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  balance: float('balance').default(0),
  password: text('password').notNull(),
  sessionToken: text('session_token'),
});
