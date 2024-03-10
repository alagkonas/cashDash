import { db } from '@/db/db';
import {
  DeleteTransactionParams,
  TransactionDTO,
  UpdateTransactionParams,
} from './types';
import { TransactionTypeEnum, transactions } from '@/db/schemas/transactions';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schemas/users';
import { updateUserBalance } from './utils/updateUserBalance';
import { getBalanceDiff } from './utils/getBalanceDiff';

export const createTransaction = async (transaction: TransactionDTO) => {
  const createdTransaction = await db.insert(transactions).values(transaction);

  if (!createdTransaction) {
    throw new Error('Transaction was not created');
  }

  //update user's balance and user record
  const user = await db.query.users.findFirst({
    where: eq(users.id, transaction.userId),
  });

  if (!user) {
    throw new Error('User was not found');
  }

  const updatedBalance = updateUserBalance(
    user.balance,
    transaction.amount,
    transaction.type
  );

  await db
    .update(users)
    .set({ balance: updatedBalance })
    .where(eq(users.id, transaction.userId));
};

export const updateTransaction = async ({
  transaction,
  oldTransactionAmount,
}: UpdateTransactionParams) => {
  const updatedTransaction = await db
    .update(transactions)
    .set({ ...transaction })
    .where(eq(transactions.id, transaction.id!));

  if (!updatedTransaction) {
    throw new Error('Transaction was not updated');
  }

  //update user's balance and user record
  const user = await db.query.users.findFirst({
    where: eq(users.id, transaction.userId),
  });

  if (!user) {
    throw new Error('User was not found');
  }

  const diff = getBalanceDiff(transaction.amount, oldTransactionAmount);

  const updatedBalance = user.balance + diff;

  await db
    .update(users)
    .set({ balance: updatedBalance })
    .where(eq(users.id, transaction.userId));
};

export const deleteTransaction = async ({
  transactionAmount,
  transactionId,
  userId,
}: DeleteTransactionParams) => {
  const deletedTransaction = await db
    .delete(transactions)
    .where(eq(transactions.id, transactionId));

  if (!deletedTransaction) {
    throw new Error('Transaction was not deleted!');
  }

  //update user's balance and user record
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error('User was not found');
  }

  const updatedBalance = user.balance - transactionAmount;

  await db
    .update(users)
    .set({ balance: updatedBalance })
    .where(eq(users.id, userId));
};
