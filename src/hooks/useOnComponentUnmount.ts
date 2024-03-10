import { useEffect } from 'react';

export const useOnComponentUnmount = (fn: VoidFunction) => {
  useEffect(
    () => () => {
      fn();
    },
    []
  );
};
