import { object, string } from 'yup';

export enum FormMode {
  Edit = 'edit',
  View = 'view',
}

export enum FormFields {
  Email = 'email',
  UserName = 'userName',
}

export type FormFieldsTypes = {
  [FormFields.Email]: string;
  [FormFields.UserName]: string;
};

export const validationSchema = object().shape({
  [FormFields.Email]: string()
    .required('Email is required')
    .nonNullable()
    .trim(),
  [FormFields.UserName]: string()
    .required('Email is required')
    .nonNullable()
    .trim(),
});
