import React from 'react';

import FormInput from '@/src/ui/form-input/FormInput';
import { View } from '@/src/ui/view/View';

import { FormFields } from './SignUpForm.types';
import { Texts } from './SignUpForm.texts';
import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';

const SignUpForm: React.FC = () => {
  return (
    <View>
      <FormInput
        field={FormFields.UserName}
        label={Texts.UserNameLabel}
        placeholder={'John Doe'}
      />
      <FormInput
        field={FormFields.Email}
        label={Texts.UserEmail}
        placeholder={'johndoe@example.com'}
        textContentType={'emailAddress'}
      />
      <FormInput
        field={FormFields.Password}
        placeholder={'password'}
        label={Texts.UserPassword}
        secureTextEntry
      />
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
            {Texts.SignUp}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default SignUpForm;
