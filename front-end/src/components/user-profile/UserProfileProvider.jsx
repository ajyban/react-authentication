import { UserProfileContext } from './useUser';
import { useToken } from './useToken';
import { useEffect, useState } from 'react';

export default function UserProfileProvider({ children }) {
  const [token, setToken] = useToken();

  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split('.')['1'];
    const payload = JSON.parse(atob(encodedPayload));
    return payload;
  };
  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  const context = {
    user,
    setUser,
    token,
    setToken,
  };
  return (
    <UserProfileContext.Provider value={context}>
      {children}
    </UserProfileContext.Provider>
  );
}
