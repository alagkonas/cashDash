import { object, string } from 'yup';

export enum FormFields {
  OldPassword = 'old-password',
  NewPassword = 'new-password',
}

export type FormFieldsTypes = {
  [FormFields.OldPassword]: string;
  [FormFields.NewPassword]: string;
};

export const validationSchema = object().shape({
  [FormFields.OldPassword]: string()
    .required('Old password is required')
    .nonNullable()
    .trim(),
  [FormFields.NewPassword]: string()
    .required('New password is required')
    .nonNullable()
    .trim(),
});
