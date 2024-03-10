import { db } from '@/db/db';
import { users } from '@/db/schemas/users';

import { UpdateUserParams, UpdateUserPasswordParams, UserDTO } from './types';
import { eq } from 'drizzle-orm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';

const salt = bcrypt.genSaltSync(7);

export const createUser = async (user: UserDTO) => {
  const doesUserExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, user.email),
  });

  if (doesUserExists) {
    throw new Error('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(user.password, salt);
  const sessionToken = bcrypt.hashSync(Date.now().toString(), salt);

  const createdUser = await db.insert(users).values({
    ...user,
    password: hashedPassword,
    sessionToken,
  });

  if (!createdUser) {
    throw new Error('User was not created!');
  }

  const userObject = await db.query.users.findFirst({
    where: eq(users.email, user.email),
  });

  AsyncStorage.setItem('sessionToken', sessionToken);
  AsyncStorage.setItem(
    'user',
    JSON.stringify({
      userName: userObject?.userName,
      email: userObject?.email,
      id: userObject?.id,
    })
  );
  return;
};

export const loginUser = async (loginValues: {
  email: string;
  password: string;
}) => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, loginValues.email),
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
  AsyncStorage.setItem(
    'user',
    JSON.stringify({
      userName: user?.userName,
      email: user?.email,
      id: user?.id,
    })
  );

  return;
};

export const signOutUser = async (userId: number) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const userUpdated = await db
    .update(users)
    .set({ sessionToken: null })
    .where(eq(users.id, user.id));

  if (!userUpdated) {
    throw new Error('Something went wrong!');
  }

  await AsyncStorage.multiRemove(['sessionToken', 'user']);

  return;
};

export const updateUser = async ({
  email,
  userId,
  userName,
}: UpdateUserParams) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const userUpdated = await db
    .update(users)
    .set({ userName: userName, email: email })
    .where(eq(users.id, userId));

  if (!userUpdated) {
    throw new Error('Something went wrong!');
  }

  AsyncStorage.setItem(
    'user',
    JSON.stringify({
      userName: userName,
      email: email,
      id: userId,
    })
  );

  return;
};

export const updateUserPassword = async ({
  newPassword,
  oldPassword,
  userId,
}: UpdateUserPasswordParams) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User doesn't exists");
  }

  const passwordMatch = bcrypt.compareSync(oldPassword, user.password);

  if (!passwordMatch) {
    throw new Error('Password is incorrect!');
  }

  const userUpdated = await db
    .update(users)
    .set({ password: newPassword })
    .where(eq(users.id, userId));

  if (!userUpdated) {
    throw new Error('Something went wrong!');
  }

  return;
};
