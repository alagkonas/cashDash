import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { styled } from 'styled-components/native';

export const SignInHeaderContainer = styled(View)`
  justify-content: center;
  align-items: center;
  height: 250px;
`;

export const SignInSubTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  width: 60%;
  margin-top: 16px;
  text-align: center;
`;
