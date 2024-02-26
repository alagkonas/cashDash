import { db } from '@/db/db';
import { users } from '@/db/schemas/users';

export const getUserData = () => {};

export const getUsers = async () => {
  db.query.users.findMany();
};
