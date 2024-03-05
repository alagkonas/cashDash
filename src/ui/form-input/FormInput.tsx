import React from 'react';

import { TextInputProps } from 'react-native/types';

import { Text } from '../text/Text';
import ThemedTextInput from '../themed-text-input/ThemedTextInput';
import { View } from '../view/View';

type FormInputProps = TextInputProps & {
  field: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  field,
  label,
  placeholder,
  disabled = false,
  // value,
  ...restInputProps
}) => {
  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <Text style={{ paddingBottom: 6, fontSize: 16 }}>{label}</Text>
      <ThemedTextInput
        disabled={disabled}
        placeholder={placeholder}
        {...restInputProps}
      />
    </View>
  );
};

export default FormInput;
