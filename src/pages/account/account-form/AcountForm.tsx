import React, { useCallback, useEffect, useMemo } from 'react';

import { Formik } from 'formik';
import { View } from '@/src/ui/view/View';
import FormInput from '@/src/ui/form-input/FormInput';
import {
  FormFields,
  FormFieldsTypes,
  FormMode,
  validationSchema,
} from './AccountForm.types';
import { Texts } from '../Account.texts';
import { LocalStorageUser } from '@/src/hooks/useGetUser';
import { ActionButtons } from '../../view-edit-transaction/components/view-edit-transaction-form/ViewEditTransactionForm.components';
import { useMutation } from '@tanstack/react-query';
import { UPDATE_USER } from '@/src/service/api/users-api/consts';
import { updateUser } from '@/src/service/api/users-api/mutations';
import SettingsListItem from '../../profile/components/settings-list-item/SettingsListItem';
import { useRouter } from 'expo-router';
import { Routes } from '@/src/routes/consts';
import styled from 'styled-components/native';

const AcountForm: React.FC<{
  user: LocalStorageUser;
  mode: FormMode;
  onChangeMode: (newMode: FormMode) => void;
}> = ({ user, mode, onChangeMode }) => {
  const router = useRouter();
  const isFormDisabled = mode === FormMode.View;

  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: [UPDATE_USER],
    mutationFn: updateUser,
  });

  const handleNavigateToChangePassword = useCallback(() => {
    router.push(Routes.ChangePassword);
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      onChangeMode(FormMode.View);
    }
  }, [isSuccess, onChangeMode]);

  const initialValues = useMemo(
    () => ({
      email: user?.email || '',
      userName: user?.userName || '',
    }),
    [user]
  );

  const handleCancel = useCallback(() => {
    onChangeMode(FormMode.View);
  }, [onChangeMode]);

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!user?.id) return;

      const payload = {
        userId: user.id,
        email: values.email,
        userName: values.userName,
      };

      try {
        mutate(payload);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    [mutate, user?.id]
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
              field={FormFields.Email}
              label={Texts.EmailLabel}
              placeholder={'johndoe@example.com'}
              textContentType={'emailAddress'}
              value={values[FormFields.Email]}
              disabled={isFormDisabled}
              onChangeText={(value) => setFieldValue(FormFields.Email, value)}
            />
            <FormInput
              field={FormFields.UserName}
              label={Texts.UserNameLabel}
              placeholder={'John Doe'}
              value={values[FormFields.UserName]}
              disabled={isFormDisabled}
              onChangeText={(value) =>
                setFieldValue(FormFields.UserName, value)
              }
            />
            <View style={{ marginVertical: 16 }}>
              <SettingsListItem
                settingName={Texts.ChangePassword}
                onPress={handleNavigateToChangePassword}
                horizontalTextMargin={20}
                bottomBorderWidh={'95%'}
              />
            </View>
            {mode === FormMode.Edit && (
              <ActionButtons
                onCancel={() => {
                  handleCancel();
                  handleReset();
                }}
                handleSubmit={() => handleSubmit(values)}
                loading={isPending}
              />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AcountForm;
