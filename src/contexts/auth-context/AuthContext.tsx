import { useIsUserAuthenticated } from '@/src/hooks/useIsUserAthenticated';
import React, { PropsWithChildren, createContext } from 'react';

export type AuthContextType = {
  sessionToken: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  sessionToken: null,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authState = useIsUserAuthenticated();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
