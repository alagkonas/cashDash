import React from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './RecentTransactions.texts';
import { RecentTransactionsList } from './RecentTransactions.components';

const RecentTransactions: React.FC = () => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 8 }}>
        {Texts.RecentTransactions}
      </Text>
      <RecentTransactionsList />
    </View>
  );
};

export default RecentTransactions;
