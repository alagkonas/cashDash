import React from 'react';

import { Text } from '@/src/ui/text/Text';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/ui/styles/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import Circle from '@/src/ui/circle/Circle';

import { TopMenuContainer } from './TopMenu.components';
import { Texts } from './TopMenu.texts';
import { useGetUser } from '@/src/hooks/useGetUser';

const TopMenu: React.FC<{ userName: string }> = ({ userName }) => {
  const colorScheme = useColorScheme();

  return (
    <TopMenuContainer>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>
        {Texts.WelcomeText}
        {userName}
      </Text>
      <Circle>
        <FontAwesome
          name='user'
          size={25}
          color={Colors[colorScheme ?? 'light'].text}
        />
      </Circle>
    </TopMenuContainer>
  );
};

export default TopMenu;
