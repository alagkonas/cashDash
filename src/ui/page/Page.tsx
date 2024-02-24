import React, { PropsWithChildren } from 'react';

import styled from 'styled-components/native';

import { View } from '../view/View';

const PageView = styled(View)`
  flex: 1;
`;

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return <PageView>{children}</PageView>;
};

export default Page;
