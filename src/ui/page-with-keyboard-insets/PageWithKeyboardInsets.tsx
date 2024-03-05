import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

import { SafeAreaView } from '../safe-area-view/SafeAreaView';
import { View } from '../view/View';

const PageWithKeyboardInsets: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaView>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageWithKeyboardInsets;
