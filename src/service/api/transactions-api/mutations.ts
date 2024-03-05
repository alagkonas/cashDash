import { db } from '@/db/db';
import { TransactionDTO } from './types';
import { TransactionTypeEnum, transactions } from '@/db/schemas/transactions';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schemas/users';
import { updateUserBalance } from './utils/updateUserBalance';

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
