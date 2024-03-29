import Button from '@/src/ui/button/Button';
import { Text } from '@/src/ui/text/Text';
import { View } from '@/src/ui/view/View';

type ActionButtonsProps = {
  handleSubmit: VoidFunction;
  onCancel: VoidFunction;
  loading: boolean;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleSubmit,
  onCancel,
  loading,
}) => {
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
        onPress={onCancel}
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
        <Text style={{ fontSize: 16 }}>Update</Text>
      </Button>
    </View>
  );
};
