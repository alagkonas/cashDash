import React from 'react';

import FormInput from '@/src/ui/form-input/FormInput';
import { View } from '@/src/ui/view/View';

import { FormFields } from './SignInForm.types';
import { Texts } from './SignInForm.texts';
import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { Link } from 'expo-router';

const LoginForm: React.FC = () => {
  return (
    <View>
      <FormInput
        field={FormFields.UserName}
        label={Texts.UserNameLabel}
        placeholder={'John Doe'}
      />
      <FormInput
        field={FormFields.Password}
        placeholder={'password'}
        label={Texts.UserPassword}
        secureTextEntry
      />
      <View
        style={{ alignItems: 'flex-end', marginVertical: 10, marginRight: 16 }}
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
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {Texts.SignIn}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;
