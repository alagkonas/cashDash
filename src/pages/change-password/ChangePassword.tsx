import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import React from 'react';
import { Texts } from './ChangePassword.texts';
import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';
import ChangePasswordForm from './change-password-form/ChangePasswordForm';

const ChangePassword: React.FC = () => {
  return (
    <PageWithKeyboardInsets>
      <View
        style={{
          marginVertical: 12,
          marginHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '600' }}>
          {Texts.ChangePassword}
        </Text>
      </View>
      <ChangePasswordForm />
    </PageWithKeyboardInsets>
  );
};

export default ChangePassword;
