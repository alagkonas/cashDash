import React, { useEffect } from 'react';

import Page from '@/src/ui/page/Page';

import TopMenu from './components/top-menu/TopMenu';
import TotalBalance from './components/total-balance/TotalBalance';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import RecentTransactions from './components/recent-transactions/RecentTransactions';
import { useQuery } from '@tanstack/react-query';
import { GET_USER } from '@/src/service/api/users-api/consts';
import { getUser } from '@/src/service/api/users-api/queries';
import { useGetUser } from '@/src/hooks/useGetUser';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { GET_USER_TRANSACTIONS } from '@/src/service/api/transactions-api/consts';
import { getUserTransactions } from '@/src/service/api/transactions-api/queries';

const DashboardPage: React.FC = () => {
  const user = useGetUser();
  const {
    data,
    isLoading,
    refetch: refetchUserData,
    error,
  } = useQuery({
    queryKey: [GET_USER],
    queryFn: () => getUser(user?.id),
  });
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
    error: txnErrors,
  } = useQuery({
    queryKey: [GET_USER_TRANSACTIONS],
    queryFn: () => getUserTransactions(user?.id),
  });

  console.log('DATAAAAAA', data);
  console.log('ΤΧΝΣ', transactions);

  useFocusEffect(() => {
    if (!data || !transactions) {
      refetchUserData();
      refetchTransactions();
    }
  });

  if (isLoading || isLoadingTransactions || !data || !transactions)
    return <ActivityIndicator />;

  return (
    <Page>
      <TopMenu userName={data.userName} />
      <TotalBalance userBalance={data.balance} />
      <RecentTransactions transactions={transactions.recentTransactions} />
      <TransactionHistory />
    </Page>
  );
};

export default DashboardPage;
