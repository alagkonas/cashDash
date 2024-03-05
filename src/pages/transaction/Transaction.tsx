import React from 'react';

import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';

import TransactionForm from './components/transaction-form/TransactionForm';
import AddTransactionHeader from './components/add-transaction-header/AddTransactionHeader';

const Transaction: React.FC = () => {
  return (
    <PageWithKeyboardInsets>
      <AddTransactionHeader />
      <TransactionForm />
    </PageWithKeyboardInsets>
  );
};

export default Transaction;
