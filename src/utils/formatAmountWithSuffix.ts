import { TransactionTypeEnum } from '@/db/schemas/transactions';

export const formatAmount = (type: TransactionTypeEnum, amount: number) => {
  if (type === TransactionTypeEnum.Deposit) {
    return `+ ${amount} €`;
  }
  return `- ${amount} €`;
};
