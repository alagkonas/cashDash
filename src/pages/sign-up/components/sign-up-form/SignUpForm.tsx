import React, { useCallback, useEffect } from 'react';

import { Formik } from 'formik';
import { Link, useRouter } from 'expo-router';

import FormInput from '@/src/ui/form-input/FormInput';
import { View } from '@/src/ui/view/View';
import { Texts } from './SignUpForm.texts';
import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/src/service/api/users-api/mutations';
import { UserDTO } from '@/src/service/api/users-api/types';
import { Routes } from '@/src/routes/consts';
import { CREATE_USER } from '@/src/service/api/users-api/consts';

import {
  FormFields,
  FormFieldsTypes,
  validationSchema,
} from './SignUpForm.types';

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { mutate, isSuccess } = useMutation({
    mutationKey: [CREATE_USER],
    mutationFn: createUser,
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isSuccess]);

  const handleSubmit = useCallback(
    (values: FormFieldsTypes) => {
      if (!values.email || !values.password || !values.userName) return;
      const payload: UserDTO = {
        email: values.email,
        userName: values.userName,
        password: values.password,
        balance: 0,
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
      <Formik<FormFieldsTypes>
        initialValues={{
          email: null,
          password: null,
          userName: null,
        }}
        validateOnBlur={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <View>
            <FormInput
              field={FormFields.UserName}
              label={Texts.UserNameLabel}
              placeholder={'John Doe'}
              onChangeText={(value) =>
                setFieldValue(FormFields.UserName, value)
              }
            />
            <FormInput
              field={FormFields.Email}
              label={Texts.UserEmail}
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
              <Link href='/sign-in'>
                <Text>{Texts.AlreadyHaveAccount}</Text>
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
              >
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {Texts.SignUp}
                </Text>
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;
