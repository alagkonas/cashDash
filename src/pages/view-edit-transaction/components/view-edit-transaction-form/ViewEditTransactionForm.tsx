import React, { useCallback, useEffect, useMemo } from 'react';

// import {capitalize} from 'lodash'

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import FormInput from '@/src/ui/form-input/FormInput';
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTION,
  UPDATE_TRANSACTION,
} from '@/src/service/api/transactions-api/consts';
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '@/src/service/api/transactions-api/mutations';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';
import { useGetUser } from '@/src/hooks/useGetUser';
import { Routes } from '@/src/routes/consts';

import {
  FormFields,
  FormFieldsTypes,
  TransactionFormMode,
  validationSchema,
} from './ViewEditTransactionForm.types';
import { Texts } from '../../../transaction/components/transaction-form/TransactionForm.texts';
import { ActionButtons } from './ViewEditTransactionForm.components';
import { Formik } from 'formik';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetFormFields } from '../../../transaction/components/transaction-form/hooks/useGetFormFields';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTransaction } from '@/src/service/api/transactions-api/queries';
import { ActivityIndicator } from 'react-native';
import { formatDate } from '@/src/utils/formatDate';

const TransactionForm: React.FC<{
  mode: TransactionFormMode;
  onChangeMode: (newMode: TransactionFormMode) => void;
  transaction: TransactionDTO;
  transactionId: number;
}> = ({ mode, onChangeMode, transaction, transactionId }) => {
  const {
    mutate: updateTransactionMutation,
    isSuccess: isUpdateSuccess,
    isPending: isUpdatePending,
  } = useMutation({
    mutationKey: [UPDATE_TRANSACTION],
    mutationFn: updateTransaction,
  });

  const router = useRouter();
  const user = useGetUser();

  useEffect(() => {
    if (isUpdateSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isUpdateSuccess, router]);

  const formFields = useGetFormFields(transaction.type);

  const areFieldsDisabled = mode === TransactionFormMode.View;

  const initialValues = useMemo(
    () => ({
      amount: String(transaction.amount) || '',
      date: formatDate(transaction.createdAt) || '',
      description: transaction.description || '',
      recipient: transaction.recipient || '',
      sender: transaction.sender || '',
    }),
    [transaction]
  );

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!values.amount || !user?.id || !transaction?.type) return;
      const payload: TransactionDTO = {
        id: Number(transactionId),
        amount: Number(values.amount),
        type: transaction.type,
        userId: user.id,
        createdAt: new Date(Date.now()),
        description: values.description,
        ...(transaction.type === TransactionTypeEnum.Deposit
          ? {
              sender: values.sender,
            }
          : {
              recipient: values.recipient,
            }),
      };

      try {
        updateTransactionMutation({
          transaction: payload,
          oldTransactionAmount: transaction.amount,
        });
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    [updateTransactionMutation, user?.id, transaction?.type]
  );

  const handleCancel = useCallback(() => {
    onChangeMode(TransactionFormMode.View);
  }, [onChangeMode]);

  return (
    <View>
      <Formik<FormFieldsTypes>
        initialValues={initialValues}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, handleReset }) => (
          <View>
            {formFields.map(
              ({
                field,
                label,
                valueMapper,
                placeHolder,
                multiline,
                numberOfLines,
              }) => (
                <FormInput
                  key={field}
                  field={field}
                  label={label}
                  value={values[field]}
                  placeholder={placeHolder}
                  disabled={areFieldsDisabled}
                  multiline={multiline}
                  numberOfLines={numberOfLines ?? 1}
                  onChangeText={(value) => {
                    if (valueMapper) {
                      return setFieldValue(
                        field,
                        valueMapper(value, values[field])
                      );
                    }
                    return setFieldValue(field, value);
                  }}
                />
              )
            )}
            {mode === TransactionFormMode.Edit && (
              <ActionButtons
                onCancel={() => {
                  handleCancel();
                  handleReset();
                }}
                handleSubmit={() => handleSubmit(values)}
                loading={isUpdatePending}
              />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default TransactionForm;
