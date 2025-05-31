import { Link, Outlet, useNavigate } from 'react-router';
import './Layout.css';
import { useUser } from './user-profile/useUser';

export default function Layout() {
  const { user, setToken } = useUser();
  const navigate = useNavigate();

  function doLogout(e) {
    e.preventDefault();
    setToken('');
    navigate('/login');
  }

  return (
    <>
      <nav className='nav-bar'>
        <div>
          <Link className='nav-bar-title ubuntu-bold' to='/'>
            React Authentication Demo App
          </Link>
        </div>
        <div>
          {user && (
            <>
              <p className='user-welcome ubuntu-regular'>
                Welcome {user?.email}
              </p>
              <button className='ubuntu-regular' onClick={(e) => doLogout(e)}>
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link className='nav-bar-item ubuntu-regular' to='/login'>
              Login
            </Link>
          )}
          <Link className='nav-bar-item ubuntu-regular' to='/profile'>
            Profile
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
