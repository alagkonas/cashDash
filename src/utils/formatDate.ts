export const formatDate = (date: Date | undefined) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions;
  return (date ?? new Date()).toLocaleDateString('en-GB', options);
};
