import React from 'react';

import { useLocalSearchParams } from 'expo-router';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { capitalize } from 'lodash';
import { View } from '@/src/ui/view/View';
import { Text } from '@/src/ui/text/Text';

const AddTransactionHeader: React.FC = () => {
  const { transactionType } = useLocalSearchParams<{
    transactionType: TransactionTypeEnum;
  }>();

  return (
    <View style={{ marginVertical: 12, marginLeft: 16 }}>
      <Text style={{ fontWeight: '600', fontSize: 24 }}>
        Add {capitalize(transactionType)}
      </Text>
    </View>
  );
};

export default AddTransactionHeader;
