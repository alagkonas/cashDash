import React, { useCallback } from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './RecentTransactions.texts';
import { RecentTransactionsList } from './RecentTransactions.components';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';
import { useQuery } from '@tanstack/react-query';
import { GET_USER_RECENT_TRANSACTIONS } from '@/src/service/api/transactions-api/consts';
import { getUserRecentTransactions } from '@/src/service/api/transactions-api/queries';
import { useGetUser } from '@/src/hooks/useGetUser';
import { useFocusEffect } from 'expo-router';

const RecentTransactions: React.FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  const user = useGetUser();

  const {
    data: recentTransactions,
    isLoading: isLoadingRecentTransactions,
    refetch: refetchRecentTransactions,
  } = useQuery({
    queryKey: [GET_USER_RECENT_TRANSACTIONS],
    queryFn: () => getUserRecentTransactions(user?.id),
  });

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        refetchRecentTransactions();
      }
    }, [user?.id, refetchRecentTransactions])
  );

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: '500', paddingHorizontal: 8 }}>
        {Texts.RecentTransactions}
      </Text>
      <RecentTransactionsList
        isLoading={isLoading || isLoadingRecentTransactions}
        transactions={recentTransactions}
      />
    </View>
  );
};

export default RecentTransactions;
