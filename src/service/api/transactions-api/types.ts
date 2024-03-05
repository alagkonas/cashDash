import { transactions } from '@/db/schemas/transactions';

export type TransactionDTO = typeof transactions.$inferInsert;
