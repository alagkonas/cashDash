import { db } from '@/db/db';
import { users } from '@/db/schemas/users';

import { UserDTO } from './types';
import { eq } from 'drizzle-orm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

const salt = bcrypt.genSaltSync(6);

export const createUser = async (user: UserDTO) => {
  const doesUserExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, user.email),
  });

  if (doesUserExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(user.password, salt);
  const sessionToken = bcrypt.hashSync(Date.now().toString(), salt);

  const createdUser = await db
    .insert(users)
    .values({
      ...user,
      password: hashedPassword,
      sessionToken,
    })
    .then();

  if (!createdUser) {
    throw new Error('User was not created!');
  }

  AsyncStorage.setItem('sessionToken', sessionToken);
  return;
};

export const loginUser = async (loginValues: {
  email: string;
  password: string;
}) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, loginValues.email),
  });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const passwordMatch = bcrypt.compareSync(loginValues.password, user.password);

  if (!passwordMatch) {
    throw new Error('Password is incorrect!');
  }

  const sessionToken = bcrypt.hashSync(Date.now().toString(), salt);

  const userUpdated = await db
    .update(users)
    .set({ sessionToken })
    .where(eq(users.id, user.id));

  if (!userUpdated) {
    throw new Error('Something went wrong!');
  }

  AsyncStorage.setItem('sessionToken', sessionToken);
  return;
};
