import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import React, { PropsWithChildren } from 'react';

import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components';
import { ColorsEnum } from '../styles/Colors';

type ButtonProps = ThemeProps &
  TouchableOpacity['props'] &
  PropsWithChildren<{
    withLightBackground?: boolean;
    backgroundColor?: ColorsEnum | string;
    height?: number | string;
    width?: number | string;
    loading?: boolean;
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
  align-items: center;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

const Button: React.FC<ButtonProps> = ({
  withLightBackground = false,
  backgroundColor,
  darkColor,
  lightColor,
  children,
  height,
  width,
  loading,
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
      loading={loading}
    >
      {loading && (
        <View style={{ marginRight: 6 }}>
          <ActivityIndicator />
        </View>
      )}
      <TouchableOpacity {...restProps}>{children}</TouchableOpacity>
    </StyledView>
  );
};

export default Button;
