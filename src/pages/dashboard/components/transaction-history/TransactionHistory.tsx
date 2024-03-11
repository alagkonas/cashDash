import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './TransactionHistory.texts';
import { TransactionHistoryList } from './TransactionHistory.components';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GET_USER_TRANSACTION_HISTORY,
  PAGINATION_LIMIT,
} from '@/src/service/api/transactions-api/consts';
import { getUserTransactionHistory } from '@/src/service/api/transactions-api/queries';
import { useGetUser } from '@/src/hooks/useGetUser';
import { useFocusEffect } from 'expo-router';
import Button from '@/src/ui/button/Button';
import { compact, flatMap, reduce, uniqBy } from 'lodash';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';

const TransactionHistory: React.FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  const user = useGetUser();
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
  const [transactionHistoryPage, setTransactionHistoryPage] =
    useState<number>(0);
  const [hasMoreTransactions, setHasMoreTransactions] = useState<boolean>(true);

  const {
    data,
    fetchNextPage,
    isLoading: isLoadingTransactionHistory,
    refetch: refetchTransactionHistory,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [GET_USER_TRANSACTION_HISTORY],
    queryFn: () => getUserTransactionHistory(user?.id, transactionHistoryPage),
    getNextPageParam: () => undefined,
    initialPageParam: 1,
  });

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        refetchTransactionHistory();
      }
    }, [user?.id, refetchTransactionHistory, transactionHistoryPage])
  );

  const handleLoadMore = useCallback(() => {
    setTransactionHistoryPage((prev) => prev + 1);
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    if (data?.pages) {
      const newTransactions = compact(flatMap(data?.pages));

      console.log(
        'CONDITION',
        newTransactions.length < PAGINATION_LIMIT,
        newTransactions.length,
        PAGINATION_LIMIT
      );

      if (newTransactions.length < PAGINATION_LIMIT) {
        setHasMoreTransactions(false);
      } else {
        setHasMoreTransactions(true);
      }

      setTransactions((prevTransactions) =>
        uniqBy([...prevTransactions, ...newTransactions], 'id')
      );
    }
  }, [data?.pages]);

  return (
    <View style={{ marginTop: 16, padding: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>
        {Texts.TransactionsHistory}
      </Text>
      <TransactionHistoryList
        isLoading={isLoading || isLoadingTransactionHistory}
        transactions={transactions}
      />
      {hasMoreTransactions && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            width={'40%'}
            height={35}
            onPress={handleLoadMore}
            loading={isFetchingNextPage}
          >
            <Text>{Texts.LoadMore}</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default TransactionHistory;
