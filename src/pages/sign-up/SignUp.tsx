import Page from '@/src/ui/page/Page';
import React from 'react';
import SignUpForm from './components/sign-up-form/SignUpForm';
import SignUpHeader from './components/sign-up-header/SignUpHeader';

const SignUp: React.FC = () => {
  return (
    <Page>
      <SignUpHeader />
      <SignUpForm />
    </Page>
  );
};

export default SignUp;
