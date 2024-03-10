export const getBalanceDiff = (
  newTransactionAmount: number,
  oldTransactionAmount: number
) => {
  return newTransactionAmount - oldTransactionAmount;
};
