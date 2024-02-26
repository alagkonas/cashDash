import { users } from '@/db/schemas/users';

export type UserDTO = typeof users.$inferInsert;
