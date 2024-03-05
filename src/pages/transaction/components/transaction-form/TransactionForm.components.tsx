import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { FormFieldsTypes } from './TransactionForm.types';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Routes } from '@/src/routes/consts';

type ActionButtonsProps = {
  handleSubmit: VoidFunction;
  handleReset: VoidFunction;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleSubmit,
  handleReset,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(() => {
    handleReset();
    router.push(Routes.Dashboard);
  }, [router, handleReset]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
      }}
    >
      <Button
        style={{ alignItems: 'center', justifyContent: 'center' }}
        height={50}
        width={'35%'}
        onPress={handleCancel}
      >
        <Text style={{ fontSize: 16 }}>Cancel</Text>
      </Button>
      <Button
        style={{ alignItems: 'center', justifyContent: 'center' }}
        height={50}
        width={'35%'}
        onPress={handleSubmit}
      >
        <Text style={{ fontSize: 16 }}>Submit</Text>
      </Button>
    </View>
  );
};
