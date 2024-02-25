import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import React, { PropsWithChildren } from 'react';

import { TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components';
import { ColorsEnum } from '../styles/Colors';
import { Text } from '../text/Text';

type ButtonProps = ThemeProps &
  TouchableOpacity['props'] &
  PropsWithChildren<{
    withLightBackground?: boolean;
    backgroundColor?: ColorsEnum | string;
    height?: number | string;
    width?: number | string;
  }>;

const StyledView = styled(View)<ButtonProps>`
  height: ${({ height }) => {
    if (typeof height === 'string') return height;
    if (typeof height === 'number') return `${height}px`;
    return '100%';
  }};
  width: ${({ width }) => {
    if (typeof width === 'string') return width;
    if (typeof width === 'number') return `${width}px`;
    return '100%';
  }};
  flex-direction: row;
  padding: 8px;
  border-radius: 50px;
  border: solid;
  border-color: white;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'inherit'};
  justify-content: center;
`;

const Button: React.FC<ButtonProps> = ({
  withLightBackground = false,
  backgroundColor,
  darkColor,
  lightColor,
  children,
  height,
  width,
  ...restProps
}) => {
  const themeBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    withLightBackground ? 'lightBackground' : 'background'
  );

  return (
    <StyledView
      height={height}
      width={width}
      backgroundColor={backgroundColor ?? themeBackgroundColor}
    >
      <TouchableOpacity {...restProps}>{children}</TouchableOpacity>
    </StyledView>
  );
};

export default Button;
