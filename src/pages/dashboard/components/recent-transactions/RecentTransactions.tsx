import React from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './RecentTransactions.texts';
import { RecentTransactionsList } from './RecentTransactions.components';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';

const RecentTransactions: React.FC<{ transactions: TransactionDTO[] }> = ({
  transactions,
}) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 8 }}>
        {Texts.RecentTransactions}
      </Text>
      <RecentTransactionsList transactions={transactions} />
    </View>
  );
};

export default RecentTransactions;
