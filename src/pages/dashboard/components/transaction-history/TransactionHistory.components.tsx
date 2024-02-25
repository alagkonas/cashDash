import { FlatList } from 'react-native';

import { View } from '@/src/ui/view/View';
import Card from '@/src/ui/card/Card';

const TransactionHistoryItem: React.FC = () => {
  return (
    <View style={{ marginVertical: 8 }}>
      <Card borderRadius={10} height={100}></Card>
    </View>
  );
};

export const TransactionHistoryList: React.FC = () => {
  return (
    <View>
      {[1, 2, 3, 4, 5].map(() => (
        <TransactionHistoryItem />
      ))}
    </View>
  );
};
