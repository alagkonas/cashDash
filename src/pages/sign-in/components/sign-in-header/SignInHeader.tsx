import React from 'react';

import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

import { Texts } from './SignInHeader.texts';
import {
  SignInHeaderContainer,
  SignInSubTitle,
} from './SignInHeader.components';

const SignInHeader: React.FC = () => {
  return (
    <SignInHeaderContainer>
      <Text style={{ fontSize: 28, fontWeight: '600' }}>
        {Texts.SignInTitle}
      </Text>
      <SignInSubTitle>{Texts.SignInTitle}</SignInSubTitle>
    </SignInHeaderContainer>
  );
};

export default SignInHeader;
