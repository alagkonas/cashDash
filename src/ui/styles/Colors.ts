const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export enum ColorsEnum {
  Dark_Gray = '#2f2f2f',
  Light_Gray = '#faf0e6',
  Dark_Background = '#121212',
  White = '#fff',
  Black = '#000',
  Red = '#FF0000',
  Faded_Gray = '#ccc',
  Green = '#00FF00',
}

export default {
  light: {
    text: ColorsEnum.Black,
    background: ColorsEnum.White,
    lightBackground: ColorsEnum.Light_Gray,
    tint: tintColorLight,
    tabIconDefault: ColorsEnum.Faded_Gray,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: ColorsEnum.White,
    background: ColorsEnum.Dark_Background,
    lightBackground: ColorsEnum.Dark_Gray,
    tint: tintColorDark,
    tabIconDefault: ColorsEnum.Faded_Gray,
    tabIconSelected: tintColorDark,
  },
};
