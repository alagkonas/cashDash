import React, { useCallback } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { capitalize } from 'lodash';
import { View } from '@/src/ui/view/View';
import { Text } from '@/src/ui/text/Text';
import { TransactionFormMode } from '../view-edit-transaction-form/ViewEditTransactionForm.types';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/src/ui/styles/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';

const AddTransactionHeader: React.FC<{
  mode: TransactionFormMode;
  onChangeMode: (newMode: TransactionFormMode) => void;
  onDelete: VoidFunction;
}> = ({ mode, onChangeMode, onDelete }) => {
  const colorScheme = useColorScheme();

  const handleChangeMode = useCallback(() => {
    const newMode =
      mode === TransactionFormMode.Edit
        ? TransactionFormMode.View
        : TransactionFormMode.Edit;
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
      <Text style={{ fontWeight: '600', fontSize: 24 }}>
        {capitalize(mode)} Transaction
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleChangeMode}>
          <FontAwesome
            size={20}
            name='edit'
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <FontAwesome
            size={20}
            name='trash'
            color={Colors[colorScheme ?? 'light'].text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransactionHeader;
