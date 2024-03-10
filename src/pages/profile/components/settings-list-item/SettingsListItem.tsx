import React from 'react';
import Circle from '@/src/ui/circle/Circle';
import Colors, { ColorsEnum } from '@/src/ui/styles/Colors';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { FontAwesome } from '@expo/vector-icons';
import {
  DimensionValue,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import Button from '@/src/ui/button/Button';

export type SettingsListItemProps = {
  iconName?: React.ComponentProps<typeof FontAwesome>['name'];
  settingName: string;
  settingNameColor?: ColorsEnum;
  onPress?: VoidFunction;
  horizontalTextMargin?: number;
  bottomBorderWidh?: DimensionValue;
};

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  iconName,
  settingName,
  settingNameColor,
  onPress,
  horizontalTextMargin = 38,
  bottomBorderWidh,
}) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          alignContent: 'flex-end',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 40,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {iconName && (
              <FontAwesome
                name={iconName}
                size={18}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginHorizontal: 13 }}
              />
            )}

            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: settingNameColor
                    ? settingNameColor
                    : Colors[colorScheme ?? 'light'].text,
                  marginHorizontal: iconName ? 0 : horizontalTextMargin,
                }}
              >
                {settingName}
              </Text>
            </View>
          </View>
          <FontAwesome
            name='angle-right'
            size={23}
            color={Colors[colorScheme ?? 'light'].tabIconDefault}
            style={{ marginHorizontal: 12 }}
          />
        </View>
        <View
          style={{
            width: bottomBorderWidh ? bottomBorderWidh : '90%',
            borderBottomWidth: 0.5,
            borderBottomColor: Colors[colorScheme ?? 'light'].lightBackground,
            alignSelf: 'flex-end',
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsListItem;
