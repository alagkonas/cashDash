import { Text, TextProps } from '../Text';

export const MonoText: React.FC<TextProps> = ({ style, ...restProps }) => {
  return <Text {...restProps} style={[style, { fontFamily: 'SpaceMono' }]} />;
};
