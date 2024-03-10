import React from 'react';

import Page from '@/src/ui/page/Page';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { useGetUser } from '@/src/hooks/useGetUser';
import Spinner from '@/src/ui/spinner/Spinner';

import SettingsList from './components/settings-list/SettingsList';

const Profile: React.FC = () => {
  const user = useGetUser();

  if (!user || !user?.id) return <Spinner />;

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
