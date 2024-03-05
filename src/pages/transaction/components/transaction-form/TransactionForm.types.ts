import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { object, string } from 'yup';

export enum FormFields {
  Amount = 'amount',
  Description = 'description',
  Date = 'date',
  Recipient = 'recipient',
  Sender = 'sender',
}

export type FormFieldsTypes = {
  [FormFields.Amount]: string;
  [FormFields.Date]: string;
  [FormFields.Description]: string;
  [FormFields.Recipient]: string;
  [FormFields.Sender]: string;
};

export const validationSchema = object().shape({
  [FormFields.Amount]: string()
    .required('Amount is required')
    .nonNullable()
    .trim(),
  [FormFields.Date]: string().required('Date is required').nonNullable().trim(),
  [FormFields.Description]: string().trim(),
  [FormFields.Recipient]: string().trim(),
  [FormFields.Sender]: string().trim(),
});
