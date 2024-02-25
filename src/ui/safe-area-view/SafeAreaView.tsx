import { SafeAreaView as DefaultSafeAreaView } from 'react-native';

import { ThemeProps, useThemeColor } from '@/src/hooks/useThemeColor';
import { styled } from 'styled-components/native';

export type ViewProps = ThemeProps & DefaultSafeAreaView['props'];

const StyledSafeAreaView = styled(DefaultSafeAreaView)`
  flex: 1;
`;

export const SafeAreaView: React.FC<ViewProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <StyledSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};
