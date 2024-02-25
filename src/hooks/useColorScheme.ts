import {
  useColorScheme as baseColorSchemeHook,
  ColorSchemeName,
} from 'react-native';

export const useColorScheme = baseColorSchemeHook;

export enum ColorSchemeEnum {
  Black = 'black',
  Light = 'light',
}
