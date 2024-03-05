import { TransactionTypeEnum } from '@/db/schemas/transactions';

export const updateUserBalance = (
  balance: number,
  transactionAmount: number,
  transactionType: TransactionTypeEnum
) => {
  if (transactionType === TransactionTypeEnum.Deposit) {
    return Number(balance) + Number(transactionAmount);
  }

  return Number(balance) - Number(transactionAmount);
};
