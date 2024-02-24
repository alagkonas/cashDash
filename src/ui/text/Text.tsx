import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import { Text as DefaultText } from 'react-native';

export type TextProps = ThemeProps & DefaultText['props'];

export const Text: React.FC<TextProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
