import { useState } from 'react';
import { NotifcationBannerContext } from './useNotificationBanner';
import NotificationBanner from './NotificationBanner';

export function NotifcationBannerProvider({ children }) {
  const [notification, setNotificaiton] = useState(null);

  const providerValue = {
    notification,
    setNotificaiton,
  };

  return (
    <NotifcationBannerContext.Provider value={providerValue}>
      {children}
      <NotificationBanner></NotificationBanner>
    </NotifcationBannerContext.Provider>
  );
}
