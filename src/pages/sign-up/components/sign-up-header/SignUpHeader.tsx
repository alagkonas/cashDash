import React from 'react';

import { Text } from '@/src/ui/text/Text';

import { Texts } from './SignUpHeader.texts';
import {
  SignUpHeaderContainer,
  SignUpSubTitle,
} from './SignUpHeader.components';

const SignUpHeader: React.FC = () => {
  return (
    <SignUpHeaderContainer>
      <Text style={{ fontSize: 28, fontWeight: '600' }}>
        {Texts.SignUpTitle}
      </Text>
      <SignUpSubTitle>{Texts.SignUpSubtitle}</SignUpSubTitle>
    </SignUpHeaderContainer>
  );
};

export default SignUpHeader;
