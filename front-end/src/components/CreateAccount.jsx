import { useEffect, useState } from 'react';
import CenteredForm from './CenteredForm';
import axios from 'axios';
import { useNavigate } from 'react-router';
import validator from 'validator';
import useNotifcationBanner from './notification/useNotificationBanner';
import { useUser } from './user-profile/useUser';

export default function CreateAcccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setToken } = useUser();
  const [enableSignUp, setEnableSignUp] = useState(false);
  const { setNotificaiton } = useNotifcationBanner();

  useEffect(() => {
    if (!email) {
      setEnableSignUp(false);
      return;
    }
    if (!password) {
      setEnableSignUp(false);
      return;
    }
    if (!confirmPassword) {
      setEnableSignUp(false);
      return;
    }
    const isEmailValid = validator.isEmail(email);
    if (!isEmailValid) {
      setEnableSignUp(false);
      return;
    }
    setEnableSignUp(true);
  }, [email, password, confirmPassword]);

  async function doSignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotificaiton({
        title: 'Password Incorrect',
        description: 'Password and Confirm Password should match',
      });
      return;
    }

    const response = await axios.post('/api/auth/signup', { email, password });
    setToken(response.data.token);
    setNotificaiton({
      title: 'Success',
      description: 'Sign up successful',
    });
    navigate('/profile');
  }
  return (
    <>
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

          <div className='ubuntu-light form-field'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              className='ubuntu-light'
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='button-group'>
            <button
              className={`ubuntu-light ${!enableSignUp ? 'disabled' : ''}`}
              disabled={!enableSignUp}
              type='submit'
              onClick={(e) => doSignUp(e)}
            >
              Sign Up
            </button>
          </div>
        </form>
      </CenteredForm>
    </>
  );
}
