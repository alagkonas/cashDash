import React from 'react';

import { ColorSchemeName, View as BaseView } from 'react-native/types';
import { styled } from 'styled-components';

import { useColorScheme } from '@/src/hooks/useColorScheme';

import { View } from '../view/View';
import Colors from '../styles/Colors';

type CircleProps = BaseView['props'];

const StyledView = styled(View)<{ colorScheme: ColorSchemeName }>`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  background-color: ${({ colorScheme }) =>
    Colors[colorScheme ?? 'light'].lightBackground};
  justify-content: center;
  align-items: center;
`;

const Circle: React.FC<CircleProps> = ({ children, ...rest }) => {
  const colorScheme = useColorScheme();

  return (
    <StyledView colorScheme={colorScheme} {...rest}>
      {children}
    </StyledView>
  );
};

export default Circle;
