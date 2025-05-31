import { createContext, useContext } from 'react';

export const NotifcationBannerContext = createContext(null);

export default function useNotifcationBanner() {
  const context = useContext(NotifcationBannerContext);
  return context;
}
