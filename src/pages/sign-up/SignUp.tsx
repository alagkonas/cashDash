import React from 'react';

import SignUpForm from './components/sign-up-form/SignUpForm';
import SignUpHeader from './components/sign-up-header/SignUpHeader';
import PageWithKeyboardInsets from '@/src/ui/page-with-keyboard-insets/PageWithKeyboardInsets';

const SignUp: React.FC = () => {
  return (
    <PageWithKeyboardInsets>
      <SignUpHeader />
      <SignUpForm />
    </PageWithKeyboardInsets>
  );
};

export default SignUp;
