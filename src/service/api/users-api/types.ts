import { users } from '@/db/schemas/users';

export type UserDTO = typeof users.$inferInsert;

export type UpdateUserParams = {
  userId: number;
  email: string;
  userName: string;
};

export type UpdateUserPasswordParams = {
  oldPassword: string;
  newPassword: string;
  userId: number;
};
