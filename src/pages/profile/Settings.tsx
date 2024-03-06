import React from 'react';

import Page from '@/src/ui/page/Page';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { useGetUser } from '@/src/hooks/useGetUser';
import { useQuery } from '@tanstack/react-query';
import { GET_USER } from '@/src/service/api/users-api/consts';
import { getUser } from '@/src/service/api/users-api/queries';
import { useFocusEffect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import SettingsList from './components/settings-list/SettingsList';

const Profile: React.FC = () => {
  const user = useGetUser();
  // const {
  //   data,
  //   isLoading,
  //   refetch: refetchUserData,
  // } = useQuery({
  //   queryKey: [GET_USER],
  //   queryFn: () => getUser(user?.id),
  //   refetchOnMount: true,
  // });

  // useFocusEffect(() => {
  //   refetchUserData();
  // });

  if (!user || !user?.id) return <ActivityIndicator />;

  return (
    <Page>
      <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>
          {user?.userName}
        </Text>
      </View>
      <SettingsList userId={user.id} />
    </Page>
  );
};

export default Profile;
