import { View } from '@/src/ui/view/View';
import React, { useCallback, useEffect } from 'react';
import SettingsListItem, {
  SettingsListItemProps,
} from '../settings-list-item/SettingsListItem';
import { ColorsEnum } from '@/src/ui/styles/Colors';
import { useMutation } from '@tanstack/react-query';
import { SIGN_OUT_USER } from '@/src/service/api/users-api/consts';
import { signOutUser } from '@/src/service/api/users-api/mutations';
import { LocalStorageUser } from '@/src/hooks/useGetUser';
import { useRouter } from 'expo-router';
import { Routes } from '@/src/routes/consts';
import { ActivityIndicator } from 'react-native';

const SettingsList: React.FC<{ userId: number }> = ({ userId }) => {
  const router = useRouter();

  const {
    mutate: signOut,
    isSuccess,
    isPending,
  } = useMutation({
    mutationKey: [SIGN_OUT_USER],
    mutationFn: () => signOutUser(userId),
  });

  const handleSettingNavigation = useCallback(() => {
    router.push(Routes.Account);
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.SignIn);
    }
  }, [isSuccess, router]);

  const settings: SettingsListItemProps[] = [
    {
      iconName: 'user',
      settingName: 'Account',
      onPress: () => handleSettingNavigation(),
    },
    {
      settingName: 'Sign out',
      settingNameColor: ColorsEnum.Red,
      onPress: signOut,
    },
  ];

  return (
    <View>
      {isPending && <ActivityIndicator />}
      {settings.map(({ iconName, settingName, settingNameColor, onPress }) => (
        <SettingsListItem
          key={settingName}
          iconName={iconName}
          settingName={settingName}
          settingNameColor={settingNameColor}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

export default SettingsList;
