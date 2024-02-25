import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  userName: varchar('user_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).primaryKey(),
});
