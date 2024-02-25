import { useColorScheme } from '@/src/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import Colors from '../styles/Colors';

type IconProps = typeof FontAwesome;

const Icon: React.FC<IconProps> = ({ ...props }) => {
  const colorScheme = useColorScheme();

  return <FontAwesome color={Colors[colorScheme ?? 'light'].text} {...props} />;
};

export default Icon;
