import React from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './TransactionHistory.texts';
import { TransactionHistoryList } from './TransactionHistory.components';

const TransactionHistory: React.FC = () => {
  return (
    <View style={{ marginTop: 16, padding: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        {Texts.TransactionsHistory}
      </Text>
      <TransactionHistoryList />
    </View>
  );
};

export default TransactionHistory;
