import { Navigate } from 'react-router';
import { useUser } from './user-profile/useUser';

export default function AuthRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to='/login' />;
}
