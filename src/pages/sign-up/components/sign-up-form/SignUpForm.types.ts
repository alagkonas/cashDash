import { object, string } from 'yup';

export enum FormFields {
  UserName = 'userName',
  Email = 'email',
  Password = 'password',
}

export type FormFieldsTypes = {
  [FormFields.UserName]: string | null;
  [FormFields.Email]: string | null;
  [FormFields.Password]: string | null;
};

export const validationSchema = object().shape({
  [FormFields.UserName]: string()
    .required('Username is required')
    .nonNullable()
    .trim(),
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
