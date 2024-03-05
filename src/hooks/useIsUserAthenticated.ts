import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { AuthContextType } from '../contexts/auth-context/AuthContext';

export const useIsUserAuthenticated = () => {
  const [authState, setAuthState] = useState<AuthContextType>({
    isAuthenticated: false,
    sessionToken: null,
  });

  const getSessionToken = useCallback(async () => {
    const sessionToken = await AsyncStorage.getItem('sessionToken');

    if (sessionToken) {
      setAuthState({
        isAuthenticated: true,
        sessionToken,
      });
      return;
    }

    setAuthState({
      isAuthenticated: false,
      sessionToken,
    });

    return;
  }, []);

  useEffect(() => {
    getSessionToken();
  }, [getSessionToken]);

  return authState;
};
