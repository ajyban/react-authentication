import { useEffect, useState } from 'react';
import CenteredForm from './CenteredForm';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useUser } from './user-profile/useUser';
import useNotifcationBanner from './notification/useNotificationBanner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken, user } = useUser();
  const { setNotificaiton } = useNotifcationBanner();
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (user && loginSuccess) {
      setNotificaiton({
        title: 'Login Success',
        description: `Logged in as ${user?.email}`,
      });
    }
  }, [user]);

  async function doLogin(e) {
    e.preventDefault();
    const response = await axios
      .post('/api/auth/login', { email, password })
      .catch(() => {
        setNotificaiton({
          title: 'Login Failed',
          description: 'Unknown Error',
        });
        return null;
      });
    if (response) {
      setToken(response.data.token);
      setLoginSuccess(true);
      navigate('/profile');
    }
  }

  return (
    <CenteredForm>
      <form className='form'>
        <div className='ubuntu-light form-field'>
          <label htmlFor='email'>Email</label>
          <input
            className='ubuntu-light'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='ubuntu-light form-field'>
          <label htmlFor='password'>Password</label>
          <input
            className='ubuntu-light'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='button-group'>
          <button
            className='ubuntu-light'
            type='submit'
            onClick={(e) => doLogin(e)}
          >
            Login
          </button>
          <button
            className='ubuntu-light'
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              navigate('/create-account');
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </CenteredForm>
  );
}
