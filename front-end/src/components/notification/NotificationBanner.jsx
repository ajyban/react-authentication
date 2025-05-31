import { useEffect } from 'react';
import './NotificationBanner.css';
import useNotifcationBanner from './useNotificationBanner';

export default function NotificationBanner() {
  const { notification, setNotificaiton } = useNotifcationBanner();
  const AUTO_CLOSE_DEFAULT_INTERVAL_MS = 5000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNotificaiton(null);
    }, AUTO_CLOSE_DEFAULT_INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
    };
  }, [notification]);

  return (
    notification && (
      <div className='info-banner'>
        <div className='content'>
          <div className='title ubuntu-light'>{notification.title}</div>
          <div className='description ubuntu-light'>
            {notification.description}
          </div>
        </div>
        <div className='buttons'>
          <button
            className='close-action ubuntu-light'
            onClick={() => setNotificaiton(null)}
          >
            X
          </button>
        </div>
      </div>
    )
  );
}
