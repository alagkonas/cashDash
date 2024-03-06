import React from 'react';

import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';

import SignInForm from './components/sign-in-form/SignInForm';
import SignInHeader from './components/sign-in-header/SignInHeader';

const SignIn: React.FC = () => {
  return (
    <PageWithKeyboardInsets>
      <SignInHeader />
      <SignInForm />
    </PageWithKeyboardInsets>
  );
};

export default SignIn;
