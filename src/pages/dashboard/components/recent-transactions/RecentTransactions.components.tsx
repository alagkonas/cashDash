import { FlatList } from 'react-native';

import { View } from '@/src/ui/view/View';
import Card from '@/src/ui/card/Card';

const RecentTransactionsItem: React.FC = () => {
  return (
    <View style={{ marginHorizontal: 8 }}>
      <Card borderRadius={10} height={100} width={100}></Card>
    </View>
  );
};

export const RecentTransactionsList: React.FC = () => {
  return (
    <View style={{ marginVertical: 8 }}>
      <FlatList
        data={['1', ' 2', '3', '4']}
        renderItem={() => <RecentTransactionsItem />}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};
