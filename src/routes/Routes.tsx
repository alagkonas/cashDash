import React, { useEffect } from 'react';

import { Stack, router } from 'expo-router';

import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useIsUserAuthenticated } from '../hooks/useIsUserAthenticated';
import { Routes as RoutesEnum } from './consts';

const Routes: React.FC = () => {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useIsUserAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(RoutesEnum.AuthDashboard);
    }
  }, [isAuthenticated]);

  console.log('IS AUTHED', isAuthenticated);

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
