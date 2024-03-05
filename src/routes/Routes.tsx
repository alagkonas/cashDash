import React, { useEffect } from 'react';

import { Stack, router } from 'expo-router';

import { useIsUserAuthenticated } from '../hooks/useIsUserAthenticated';
import { Routes as RoutesEnum } from './consts';
import { useGetUser } from '../hooks/useGetUser';

const Routes: React.FC = () => {
  const { isAuthenticated } = useIsUserAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(RoutesEnum.Dashboard);
    }
  }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name='(public)' options={{ headerShown: false }} />
      )}
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default Routes;
