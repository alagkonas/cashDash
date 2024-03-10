import React from 'react';

import { View as NativeView } from 'react-native';

import { View } from '@/src/ui/view/View';
import Card from '@/src/ui/card/Card';
import { Text } from '@/src/ui/text/Text';
import { Actions, BalanceIcon, CashBalance } from './TotalBalance.components';

const TotalBalance: React.FC<{
  userBalance: number | undefined;
  isLoading: boolean;
}> = ({ isLoading, userBalance }) => {
  return (
    <View style={{ padding: 12 }}>
      <Card height={200}>
        <NativeView style={{ justifyContent: 'space-between', height: '100%' }}>
          <NativeView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CashBalance isLoading={isLoading} userBalance={userBalance} />
            <BalanceIcon />
          </NativeView>
          <Actions />
        </NativeView>
      </Card>
    </View>
  );
};

export default TotalBalance;
