import Page from '@/src/ui/page/Page';
import React from 'react';
import SignInForm from './components/sign-in-form/SignInForm';
import SignInHeader from './components/sign-in-header/SignInHeader';

const SignIn: React.FC = () => {
  return (
    <Page>
      <SignInHeader />
      <SignInForm />
    </Page>
  );
};

export default SignIn;
