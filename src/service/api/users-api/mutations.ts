import { db } from '@/db/db';
import { users } from '@/db/schemas/users';

import { UserDTO } from './types';

export const createUser = async (user: UserDTO) => {
  db.insert(users).values(user);
};
