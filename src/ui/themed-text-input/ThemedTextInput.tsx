import React from 'react';

import { TextInput as DefaultTextInput } from 'react-native';

import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import { styled } from 'styled-components/native';
import { number } from 'yup';

export type TextProps = ThemeProps &
  DefaultTextInput['props'] & { disabled: boolean };

const StyledDefaultTextInput = styled(DefaultTextInput)<{
  backgroundColor: string;
  disabled: boolean;
}>`
  border-radius: 15px;
  width: 100%;
  height: ${({ numberOfLines }) =>
    numberOfLines ? `${numberOfLines * 50}px` : '50px'};
  font-size: 18px;
  padding: 8px 12px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
