import React from 'react';

import { Stack } from 'expo-router';
import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';

const PublicRoutes: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='sign-in'>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false }} />
      <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default PublicRoutes;
