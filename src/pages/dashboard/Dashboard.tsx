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

const DashboardPage: React.FC = () => {
  const user = useGetUser();
  const {
    data,
    isLoading,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: [GET_USER],
    queryFn: () => getUser(user?.id),
    refetchOnMount: true,
  });

  useFocusEffect(() => {
    refetchUserData();
  });

  if (isLoading || !data) return <ActivityIndicator />;

  return (
    <Page>
      <TopMenu userName={data.userName} />
      <TotalBalance userBalance={data.balance} />
      <RecentTransactions />
      <TransactionHistory />
    </Page>
  );
};

export default DashboardPage;
