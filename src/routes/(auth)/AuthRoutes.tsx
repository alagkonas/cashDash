import React, { useCallback } from 'react';

import { Tabs, useRouter } from 'expo-router';
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
  const router = useRouter();

  const handleNavigateBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Tabs
      backBehavior='history'
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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='briefcase' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          title: 'Analytics',
          headerShown: false,
          tabBarButton: () => null,
          // tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <Tabs.Screen
        name='(transactions)/[transactionType]'
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null,
          unmountOnBlur: true,
          headerLeft: ({}) => (
            <FontAwesome
              name='angle-left'
              size={30}
              style={{ marginBottom: -3, marginLeft: 12 }}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
              onPress={handleNavigateBack}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(transactions)/view-edit-transaction/[id]'
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null,
          unmountOnBlur: true,
          headerLeft: ({}) => (
            <FontAwesome
              name='angle-left'
              size={30}
              style={{ marginBottom: -3, marginLeft: 12 }}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
              onPress={handleNavigateBack}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(settings)/settings'
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null,
          unmountOnBlur: true,
          headerLeft: ({}) => (
            <FontAwesome
              name='angle-left'
              size={30}
              style={{ marginBottom: -3, marginLeft: 12 }}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
              onPress={handleNavigateBack}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(settings)/account/index'
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null,
          unmountOnBlur: true,
          headerLeft: ({}) => (
            <FontAwesome
              name='angle-left'
              size={30}
              style={{ marginBottom: -3, marginLeft: 12 }}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
              onPress={handleNavigateBack}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='(settings)/account/change-password/index'
        options={{
          title: '',
          headerShown: true,
          tabBarButton: () => null,
          unmountOnBlur: true,
          headerLeft: ({}) => (
            <FontAwesome
              name='angle-left'
              size={30}
              style={{ marginBottom: -3, marginLeft: 12 }}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
              onPress={handleNavigateBack}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthRoutes;
