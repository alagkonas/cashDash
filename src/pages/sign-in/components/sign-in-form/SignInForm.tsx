import React, { useCallback, useEffect } from 'react';

import FormInput from '@/src/ui/form-input/FormInput';
import { View } from '@/src/ui/view/View';

import {
  FormFields,
  FormFieldsTypes,
  validationSchema,
} from './SignInForm.types';
import { Texts } from './SignInForm.texts';
import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Routes } from '@/src/routes/consts';
import { useMutation } from '@tanstack/react-query';
import { SIGN_IN_USER } from '@/src/service/api/users-api/consts';
import { loginUser } from '@/src/service/api/users-api/mutations';
import { toLower } from 'lodash';
import { ActivityIndicator } from 'react-native';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: [SIGN_IN_USER],
    mutationFn: loginUser,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isSuccess, router]);

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!values.email || !values.password) return;

      const payload = {
        email: toLower(values.email),
        password: values.password,
      };

      try {
        mutate(payload);
      } catch (error) {
        console.log('ERROR: ', error);
      }
    },
    [mutate]
  );

  return (
    <View>
      {/* {isPending && <ActivityIndicator />} */}
      <Formik<FormFieldsTypes>
        initialValues={{
          email: null,
          password: null,
        }}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <View>
            <FormInput
              field={FormFields.Email}
              label={Texts.UserEmailLabel}
              placeholder={'johndoe@example.com'}
              textContentType={'emailAddress'}
              onChangeText={(value) => setFieldValue(FormFields.Email, value)}
            />
            <FormInput
              field={FormFields.Password}
              placeholder={'password'}
              label={Texts.UserPassword}
              onChangeText={(value) =>
                setFieldValue(FormFields.Password, value)
              }
              secureTextEntry
            />
            <View
              style={{
                alignItems: 'flex-end',
                marginVertical: 10,
                marginRight: 16,
              }}
            >
              <Link href='/sign-up'>
                <Text>{Texts.NoAccounts}</Text>
              </Link>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Button
                style={{ alignItems: 'center', justifyContent: 'center' }}
                height={50}
                width={'60%'}
                onPress={() => {
                  handleSubmit(values);
                }}
                loading={isPending}
              >
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {Texts.SignIn}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
