import React from 'react';

import { Stack } from 'expo-router';

import { useColorScheme } from '@/src/hooks/useColorScheme';

const Routes: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default Routes;
