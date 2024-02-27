import React, { useEffect } from 'react';

import Page from '@/src/ui/page/Page';

import TopMenu from './components/top-menu/TopMenu';
import TotalBalance from './components/total-balance/TotalBalance';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import RecentTransactions from './components/recent-transactions/RecentTransactions';
import { useQuery } from '@tanstack/react-query';
import { GET_USERS } from '@/src/service/api/users-api/consts';
import { getUsers } from '@/src/service/api/users-api/queries';

const DashboardPage: React.FC = () => {
  const { data } = useQuery({ queryKey: [GET_USERS], queryFn: getUsers });

  return (
    <Page>
      <TopMenu />
      <TotalBalance />
      <RecentTransactions />
      <TransactionHistory />
    </Page>
  );
};

export default DashboardPage;
