import React from 'react';

import { TextInputProps } from 'react-native/types';

import { Text } from '../text/Text';
import ThemedTextInput from '../themed-text-input/ThemedTextInput';
import { View } from '../view/View';

type FormInputProps = TextInputProps & {
  field: string;
  label: string;
  placeholder?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  field,
  label,
  placeholder,
  ...restInputProps
}) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Text style={{ paddingBottom: 6, fontSize: 16 }}>{label}</Text>
      <ThemedTextInput placeholder={placeholder} {...restInputProps} />
    </View>
  );
};

export default FormInput;
