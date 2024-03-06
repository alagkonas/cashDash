import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';
import { FormFieldsTypes } from './TransactionForm.types';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Routes } from '@/src/routes/consts';
import { useOnComponentUnmount } from '@/src/hooks/useOnComponentUnmount';

type ActionButtonsProps = {
  handleSubmit: VoidFunction;
  handleReset: VoidFunction;
  loading: boolean;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleSubmit,
  handleReset,
  loading,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(() => {
    handleReset();
    router.push(Routes.Dashboard);
  }, [router, handleReset]);

  useOnComponentUnmount(handleReset);

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
        loading={loading}
      >
        <Text style={{ fontSize: 16 }}>Submit</Text>
      </Button>
    </View>
  );
};
