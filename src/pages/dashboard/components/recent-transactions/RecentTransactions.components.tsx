import { FlatList } from 'react-native';

import { View } from '@/src/ui/view/View';
import Card from '@/src/ui/card/Card';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';
import { Text } from '@/src/ui/text/Text';
import { ColorsEnum } from '@/src/ui/styles/Colors';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { formatDate } from '@/src/utils/formatDate';
import { formatAmount } from '@/src/utils/formatAmountWithSuffix';
import { truncate } from 'lodash';
import Spinner from '@/src/ui/spinner/Spinner';

const RecentTransactionsItem: React.FC<{
  transaction: TransactionDTO;
}> = ({ transaction: { type, amount, createdAt, recipient, sender } }) => {
  const senderOrRecipinet =
    type === TransactionTypeEnum.Deposit ? sender : recipient;

  return (
    <View style={{ marginHorizontal: 8 }}>
      <Card borderRadius={10} height={100} width={110}>
        <View
          style={{
            backgroundColor: ColorsEnum.Dark_Gray,
            justifyContent: 'space-between',
            height: '100%',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ backgroundColor: ColorsEnum.Dark_Gray }}>
            {formatDate(createdAt)}
          </Text>
          <Text
            style={{
              backgroundColor: ColorsEnum.Dark_Gray,
              fontSize: 16,
              fontWeight: '600',
              color:
                type === TransactionTypeEnum.Deposit
                  ? ColorsEnum.Green
                  : ColorsEnum.Red,
            }}
          >
            {formatAmount(type, amount)}
          </Text>
          <Text
            style={{
              backgroundColor: ColorsEnum.Dark_Gray,
            }}
          >
            {truncate(senderOrRecipinet ?? '', { length: 13 })}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export const RecentTransactionsList: React.FC<{
  transactions: TransactionDTO[] | undefined | null;
  isLoading: boolean;
}> = ({ transactions, isLoading }) => {
  return (
    <View style={{ marginVertical: 8 }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <RecentTransactionsItem transaction={item} />
          )}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      )}
    </View>
  );
};
