import { createContext, useContext } from 'react';

export const UserProfileContext = createContext();

export function useUser() {
  const context = useContext(UserProfileContext);
  return context;
}
