import { View as DefaultView } from 'react-native';

import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';

export type ViewProps = ThemeProps & DefaultView['props'];

export const View: React.FC<ViewProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
