import React, { useCallback, useEffect, useState } from 'react';

import Page from '@/src/ui/page/Page';

import TopMenu from './components/top-menu/TopMenu';
import TotalBalance from './components/total-balance/TotalBalance';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import RecentTransactions from './components/recent-transactions/RecentTransactions';
import { useQuery } from '@tanstack/react-query';
import { GET_USER } from '@/src/service/api/users-api/consts';
import { getUser } from '@/src/service/api/users-api/queries';
import { useGetUser } from '@/src/hooks/useGetUser';
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
  });

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        refetchUserData();
      }
    }, [refetchUserData, user?.id])
  );

  return (
    <Page>
      <TopMenu userName={data?.userName} />
      <TotalBalance isLoading={isLoading} userBalance={data?.balance} />
      <RecentTransactions isLoading={isLoading} />
      <TransactionHistory isLoading={isLoading} />
    </Page>
  );
};

export default DashboardPage;
