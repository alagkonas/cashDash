import React, { useCallback, useEffect } from 'react';

// import {capitalize} from 'lodash'

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import FormInput from '@/src/ui/form-input/FormInput';
import {
  FormFields,
  FormFieldsTypes,
  validationSchema,
} from './TransactionForm.types';
import { Texts } from './TransactionForm.texts';
import { ActionButtons } from './TransactionForm.components';
import { Formik } from 'formik';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetFormFields } from './hooks/useGetFormFields';
import { useMutation } from '@tanstack/react-query';
import { CREATE_TRANSACTION } from '@/src/service/api/transactions-api/consts';
import { createTransaction } from '@/src/service/api/transactions-api/mutations';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';
import { useGetUser } from '@/src/hooks/useGetUser';
import { Routes } from '@/src/routes/consts';

const TransactionForm: React.FC = () => {
  const { transactionType } = useLocalSearchParams<{
    transactionType: TransactionTypeEnum;
  }>();
  const router = useRouter();
  const user = useGetUser();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: [CREATE_TRANSACTION],
    mutationFn: createTransaction,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isSuccess, router]);

  const formFields = useGetFormFields(transactionType);

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!values.amount || !user?.id) return;
      const payload: TransactionDTO = {
        amount: Number(values.amount),
        type: transactionType,
        userId: user.id,
        createdAt: new Date(Date.now()),
        description: values.description,
        ...(transactionType === TransactionTypeEnum.Deposit
          ? {
              sender: values.sender,
            }
          : {
              recipient: values.recipient,
            }),
      };

      try {
        mutate(payload);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    [mutate, user?.id, transactionType]
  );

  return (
    <View>
      <Formik<FormFieldsTypes>
        initialValues={{
          amount: '',
          date: '',
          description: '',
          recipient: '',
          sender: '',
        }}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, handleReset }) => (
          <View>
            {formFields.map(({ field, label, valueMapper, placeHolder }) => (
              <FormInput
                key={field}
                field={field}
                label={label}
                value={values[field]}
                placeholder={placeHolder}
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
            ))}
            <ActionButtons
              handleReset={handleReset}
              handleSubmit={() => handleSubmit(values)}
              loading={isPending}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default TransactionForm;
