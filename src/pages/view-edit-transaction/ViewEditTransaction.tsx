import React, { useCallback, useEffect, useState } from 'react';

import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';

import TransactionForm from './components/view-edit-transaction-form/ViewEditTransactionForm';
import { TransactionFormMode } from './components/view-edit-transaction-form/ViewEditTransactionForm.types';
import AddTransactionHeader from './components/view-edit-header/ViewEditTransactionHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DELETE_TRANSACTION,
  GET_TRANSACTION,
} from '@/src/service/api/transactions-api/consts';
import { getTransaction } from '@/src/service/api/transactions-api/queries';
import { useGetUser } from '@/src/hooks/useGetUser';
import { deleteTransaction } from '@/src/service/api/transactions-api/mutations';
import { ActivityIndicator } from 'react-native';
import { Routes } from '@/src/routes/consts';

const Transaction: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [mode, setMode] = useState<TransactionFormMode>(
    TransactionFormMode.View
  );
  const user = useGetUser();
  const router = useRouter();

  const {
    data: transaction,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [GET_TRANSACTION],
    queryFn: () => getTransaction(Number(id)),
  });

  const {
    mutate: deleteTransactionMutation,
    isSuccess: isDeletionSuccess,
    isPending: isDeletionPending,
  } = useMutation({
    mutationKey: [DELETE_TRANSACTION],
    mutationFn: deleteTransaction,
  });

  useEffect(() => {
    if (isDeletionSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isDeletionSuccess, router]);

  const handleChangeMode = useCallback((newMode: TransactionFormMode) => {
    setMode(newMode);
  }, []);

  const handleDelete = useCallback(() => {
    if (!transaction?.amount || !transaction?.id || !user?.id) return;
    try {
      deleteTransactionMutation({
        transactionAmount: transaction.amount,
        transactionId: transaction.id,
        userId: user.id,
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }, [transaction?.amount, transaction?.id, user?.id]);

  return (
    <PageWithKeyboardInsets>
      <AddTransactionHeader
        mode={mode}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      {isLoading || isRefetching || isDeletionPending || !transaction ? (
        <ActivityIndicator />
      ) : (
        <TransactionForm
          mode={mode}
          onChangeMode={handleChangeMode}
          transaction={transaction}
          transactionId={Number(id)}
        />
      )}
    </PageWithKeyboardInsets>
  );
};

export default Transaction;
