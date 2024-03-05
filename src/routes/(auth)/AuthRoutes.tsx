import React from 'react';

import { Stack, Tabs } from 'expo-router';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import Colors from '@/src/ui/styles/Colors';
import { useClientOnlyValue } from '@/src/hooks/useClientOnlyValue';
import { FontAwesome } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const AuthRoutes: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name='dashboard'
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          title: 'Analytics',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(transactions)/[transactionType]'
        options={{
          title: 'Transaction',
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
};

export default AuthRoutes;
