import { TouchableOpacity, useColorScheme } from 'react-native';
import React, { useCallback } from 'react';
import { Texts } from '../Account.texts';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/ui/styles/Colors';
import { FormMode } from '../account-form/AccountForm.types';
import { View } from '@/src/ui/view/View';
import { Text } from '@/src/ui/text/Text';

const AccountHeader: React.FC<{
  mode: FormMode;
  onChangeMode: (newMode: FormMode) => void;
}> = ({ mode, onChangeMode }) => {
  const colorScheme = useColorScheme();

  const handleChangeMode = useCallback(() => {
    const newMode = mode === FormMode.Edit ? FormMode.View : FormMode.Edit;
    onChangeMode(newMode);
  }, [onChangeMode, mode]);

  return (
    <View
      style={{
        marginVertical: 12,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>{Texts.Account}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleChangeMode}>
          <FontAwesome
            size={20}
            name='edit'
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountHeader;
