import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

import { SafeAreaView } from '../safe-area-view/SafeAreaView';
import { View } from '../view/View';

const Page: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default Page;
