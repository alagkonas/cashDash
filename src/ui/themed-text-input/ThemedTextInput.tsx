import React from 'react';

import { TextInput as DefaultTextInput } from 'react-native';

import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import { styled } from 'styled-components/native';

export type TextProps = ThemeProps & DefaultTextInput['props'];

const StyledDefaultTextInput = styled(DefaultTextInput)<{
  backgroundColor: string;
}>`
  border-radius: 15px;
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding: 0 12px;
`;

export const ThemedTextInput: React.FC<TextProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'lightBackground'
  );

  return (
    <StyledDefaultTextInput
      backgroundColor={backgroundColor}
      style={[{ color }, style]}
      {...otherProps}
    />
  );
};

export default ThemedTextInput;
