import { transactions } from '@/db/schemas/transactions';

export type TransactionDTO = typeof transactions.$inferInsert;

export type UpdateTransactionParams = {
  transaction: TransactionDTO;
  oldTransactionAmount: number;
};

export type DeleteTransactionParams = {
  transactionId: number;
  userId: number;
  transactionAmount: number;
};
