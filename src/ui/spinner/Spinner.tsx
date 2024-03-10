import React from 'react';
import { View } from '../view/View';
import { ActivityIndicator } from 'react-native';

const Spinner: React.FC = () => {
  return (
    // <View
    //   style={{
    //     height: '100%',
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}
    // >
    <ActivityIndicator />
    // </View>
  );
};

export default Spinner;
