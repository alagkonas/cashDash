import React from 'react';

import Page from '@/src/ui/page/Page';

import TopMenu from './components/top-menu/TopMenu';
import TotalBalance from './components/total-balance/TotalBalance';
import TransactionHistory from './components/transaction-history/TransactionHistory';
import RecentTransactions from './components/recent-transactions/RecentTransactions';

const DashboardPage: React.FC = () => {
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
