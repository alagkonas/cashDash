import { useCallback, useEffect, useState } from 'react';
import { UserDTO } from '../service/api/users-api/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocalStorageUser = Pick<UserDTO, 'id' | 'email' | 'userName'> | null;

export const useGetUser = () => {
  const [user, setUser] = useState<LocalStorageUser>(null);

  const getUserFromLocalStorage = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user) as UserDTO;
      setUser({
        email: parsedUser.email,
        userName: parsedUser.userName,
        id: parsedUser.id,
      });
      return;
    }

    setUser(null);

    return;
  }, []);

  useEffect(() => {
    getUserFromLocalStorage();
  }, [getUserFromLocalStorage]);

  return user;
};
