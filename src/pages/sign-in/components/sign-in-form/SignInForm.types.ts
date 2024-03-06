import { object, string } from 'yup';

export enum FormFields {
  Email = 'email',
  Password = 'password',
}

export type FormFieldsTypes = {
  [FormFields.Email]: string | null;
  [FormFields.Password]: string | null;
};

export const validationSchema = object().shape({
  [FormFields.Email]: string()
    .email('Invalid email format')
    .required('Email is required')
    .nonNullable()
    .trim(),
  [FormFields.Password]: string()
    .required('Password is required')
    .nonNullable()
    .trim(),
});
