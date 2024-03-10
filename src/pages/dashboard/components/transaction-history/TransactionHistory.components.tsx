import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { View } from '@/src/ui/view/View';
import Card from '@/src/ui/card/Card';
import { TransactionDTO } from '@/src/service/api/transactions-api/types';
import Colors, { ColorsEnum } from '@/src/ui/styles/Colors';
import { Text } from '@/src/ui/text/Text';
import { formatDate } from '@/src/utils/formatDate';
import { formatAmount } from '@/src/utils/formatAmountWithSuffix';
import { TransactionTypeEnum } from '@/db/schemas/transactions';
import { truncate } from 'lodash';
import { Texts } from './TransactionHistory.texts';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { useCallback, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Routes } from '@/src/routes/consts';
import Spinner from '@/src/ui/spinner/Spinner';

const StyledText = styled(Text)`
  background-color: ${ColorsEnum.Dark_Gray};
  font-size: 16px;
  font-weight: 500;
`;

const AmountView: React.FC<{ amount: number; type: TransactionTypeEnum }> = ({
  amount,
  type,
}) => {
  return (
    <View
      style={{
        backgroundColor: ColorsEnum.Dark_Gray,
        justifyContent: 'center',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          backgroundColor: ColorsEnum.Dark_Gray,
          fontSize: 24,
          fontWeight: '600',
          color:
            type === TransactionTypeEnum.Deposit
              ? ColorsEnum.Green
              : ColorsEnum.Red,
        }}
      >
        {formatAmount(type, amount)}
      </Text>
    </View>
  );
};

const TransactionHistoryItem: React.FC<{
  transaction: TransactionDTO;
}> = ({
  transaction: { amount, type, createdAt, description, sender, recipient, id },
}) => {
  const router = useRouter();

  const handleNavigateToTransaction = useCallback(() => {
    router.push(`${Routes.TransactionView}/${id}`);
  }, [router, id]);

  const senderOrRecipient =
    type === TransactionTypeEnum.Deposit ? sender : recipient;

  const senderOrRecipientLabel =
    type === TransactionTypeEnum.Deposit ? Texts.Sender : Texts.Recipient;

  return (
    <TouchableOpacity
      style={{ marginVertical: 8 }}
      onPress={handleNavigateToTransaction}
    >
      <Card borderRadius={10} height={100}>
        <View
          style={{
            backgroundColor: ColorsEnum.Dark_Gray,
            flexDirection: 'row',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <AmountView amount={amount} type={type} />
          <View
            style={{
              backgroundColor: ColorsEnum.Dark_Gray,
              justifyContent: 'space-between',
              height: '100%',
              width: '85%',
              alignContent: 'flex-start',
              alignItems: 'flex-start',
              marginLeft: 12,
            }}
          >
            <StyledText>
              {Texts.DateLabel}
              {formatDate(createdAt)}
            </StyledText>

            <StyledText>
              {senderOrRecipientLabel}
              {senderOrRecipient}
            </StyledText>
            <StyledText ellipsizeMode='tail' numberOfLines={1}>
              {Texts.DescriptionLabel}
              {description}
            </StyledText>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export const TransactionHistoryList: React.FC<{
  transactions: TransactionDTO[] | undefined;
  isLoading: boolean;
}> = ({ transactions, isLoading }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    console.log(layoutMeasurement.height, contentOffset.y, contentSize.height);

    const paddingToBottom = 100; // Adjust this value as needed
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      console.log('END REACHED'); // Call onEndReached when end of list is reached
    }
  };

  //   isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
  //    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  // }

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Adjust throttle as needed for performance
    >
      <View>
        {isLoading ? (
          <Spinner />
        ) : (
          transactions?.map((transaction, index) => (
            <TransactionHistoryItem key={index} transaction={transaction} />
          ))
        )}
      </View>
    </ScrollView>
  );
};
