import { useMemo } from 'react';
import { FormFields } from '../TransactionForm.types';
import { Texts } from '../TransactionForm.texts';
import { TransactionTypeEnum } from '@/db/schemas/transactions';

export const useGetFormFields = (transactionType: TransactionTypeEnum) =>
  useMemo(
    () => [
      {
        field: FormFields.Amount,
        label: Texts.AmountLabel,
      },
      {
        field: FormFields.Date,
        label: Texts.DateLabel,
      },
      {
        field: FormFields.Description,
        label: Texts.DescriptionLabel,
      },
      transactionType === TransactionTypeEnum.Deposit
        ? {
            field: FormFields.Sender,
            label: Texts.SenterLabel,
          }
        : {
            field: FormFields.Recipient,
            label: Texts.RecipientLabel,
          },
    ],
    [transactionType]
  );
