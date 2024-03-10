import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useGetUser } from '@/src/hooks/useGetUser';
import { Formik } from 'formik';
import FormInput from '@/src/ui/form-input/FormInput';
import { ActionButtons } from '../../view-edit-transaction/components/view-edit-transaction-form/ViewEditTransactionForm.components';
import {
  FormFields,
  FormFieldsTypes,
  validationSchema,
} from './ChangePasswordForm.types';
import { Texts } from '../ChangePassword.texts';
import { useMutation } from '@tanstack/react-query';
import { UPDATE_USER_PASSWORD } from '@/src/service/api/users-api/consts';
import { updateUserPassword } from '@/src/service/api/users-api/mutations';
import { useRouter } from 'expo-router';

const ChangePasswordForm: React.FC = () => {
  const user = useGetUser();
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: [UPDATE_USER_PASSWORD],
    mutationFn: updateUserPassword,
  });

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [router]);

  const initialValues = useMemo(
    () => ({
      [FormFields.OldPassword]: '',
      [FormFields.NewPassword]: '',
    }),
    [user]
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!user?.id) return;

      const payload = {
        oldPassword: values[FormFields.OldPassword],
        newPassword: values[FormFields.NewPassword],
        userId: user.id,
      };

      try {
        mutate(payload);
      } catch (error) {
        console.log('Error: ', error);
      }
    },
    [user?.id, mutate]
  );

  return (
    <View>
      <Formik<FormFieldsTypes>
        initialValues={initialValues}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, handleReset }) => (
          <View>
            <FormInput
              field={FormFields.OldPassword}
              label={Texts.OldPassword}
              textContentType={'password'}
              value={values[FormFields.OldPassword]}
              secureTextEntry
              onChangeText={(value) =>
                setFieldValue(FormFields.OldPassword, value)
              }
            />
            <FormInput
              field={FormFields.NewPassword}
              label={Texts.NewPassword}
              textContentType={'password'}
              value={values[FormFields.NewPassword]}
              secureTextEntry
              onChangeText={(value) =>
                setFieldValue(FormFields.NewPassword, value)
              }
            />
            <ActionButtons
              onCancel={() => {
                handleCancel();
                handleReset();
              }}
              handleSubmit={() => handleSubmit(values)}
              loading={isPending}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePasswordForm;
