import React from 'react';

import { styled } from 'styled-components/native';
import { View as BaseView } from 'react-native/types';

import { useColorScheme, ColorSchemeEnum } from '@/src/hooks/useColorScheme';

import { View } from '../view/View';
import Colors, { ColorsEnum } from '../styles/Colors';
import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';

type CardProps = ThemeProps &
  BaseView['props'] & {
    height?: number;
    width?: number;
    borderRadius?: number;
  };

const StyledCard = styled(View)<CardProps & { backgroundColor: string }>`
  height: ${({ height }) => (height ? `${height}px` : '100%')};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'inherit'};
  padding: 16px;
  border-radius: ${({ borderRadius }) =>
    borderRadius ? `${borderRadius}px` : '30px'};
`;

const Card: React.FC<CardProps> = ({
  children,
  lightColor,
  darkColor,
  ...rest
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'lightBackground'
  );

  return (
    <StyledCard backgroundColor={backgroundColor} {...rest}>
      {children}
    </StyledCard>
  );
};

export default Card;
