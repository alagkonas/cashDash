import { View } from 'react-native';

import { Text } from '@/src/ui/text/Text';

import { Texts } from './TotalBalance.texts';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import Colors from '@/src/ui/styles/Colors';
import Button from '@/src/ui/button/Button';

export const CashBalance = () => {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        {Texts.CashBalance}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 12,
          alignItems: 'center',
        }}
      >
        <FontAwesome
          size={35}
          name='euro'
          color={Colors[colorScheme ?? 'light'].text}
        />
        <Text style={{ fontSize: 38, fontWeight: '600', marginLeft: 6 }}>
          5000
        </Text>
      </View>
    </View>
  );
};

export const BalanceIcon: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ marginRight: 40 }}>
      <FontAwesome
        size={55}
        name='balance-scale'
        color={Colors[colorScheme ?? 'light'].text}
      />
    </View>
  );
};

export const Actions: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Button withLightBackground width={'40%'} height={35}>
        <Text>{Texts.AddDeposit}</Text>
      </Button>
      <Button withLightBackground width={'40%'} height={35}>
        <Text>{Texts.AddExpense}</Text>
      </Button>
    </View>
  );
};
