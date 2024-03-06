import { useCallback, useMemo } from 'react';
import { FormFields } from '../TransactionForm.types';
import { Texts } from '../TransactionForm.texts';
import { TransactionTypeEnum } from '@/db/schemas/transactions';

const separator = '/';

export const useGetFormFields = (transactionType: TransactionTypeEnum) => {
  const handleSetDate = useCallback((text: string, previousText: string) => {
    let newText = text;

    if (text.length === 2 || text.length === 5) {
      if (text.length > previousText.length && !text.endsWith(separator)) {
        newText += separator;
      }
    } else if (text.length === 8 && !text.includes(separator)) {
      newText = `${text.substring(0, 2)}${separator}${text.substring(
        2,
        4
      )}${separator}${text.substring(4, 8)}`;
    }

    if (
      text.length < previousText.length &&
      (text.length === 3 || text.length === 6) &&
      text.endsWith(separator)
    ) {
      newText = text.substring(0, text.length - 1);
    }

    return newText;
  }, []);

  return useMemo(
    () => [
      {
        field: FormFields.Amount,
        label: Texts.AmountLabel,
        placeHolder: '100',
      },
      {
        field: FormFields.Date,
        label: Texts.DateLabel,
        valueMapper: handleSetDate,
        placeHolder: 'DD/MM/YYYY',
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
};
