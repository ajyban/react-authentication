import { useState } from 'react';
import CenteredForm from '../CenteredForm';
import axios from 'axios';
import { useUser } from './useUser';
export default function UserProfile() {
  const { token, setToken, user } = useUser();

  const profile = user?.profile || {};
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [gender, setGender] = useState(profile?.gender || '');

  async function doUpdate(e) {
    e.preventDefault();
    const response = await axios
      .put(
        '/api/auth/users/' + user.id,
        {
          firstName,
          lastName,
          gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => console.log(err));
    const { token: newToken } = response.data;
    setToken(newToken);
  }

  return (
    <div>
      <h1>User Profile</h1>
      <CenteredForm>
        <form className='form'>
          <div className='ubuntu-light form-field'>
            <label htmlFor='firstName'>First name</label>
            <input
              className='ubuntu-light'
              id='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className='ubuntu-light form-field'>
            <label htmlFor='lastName'>Last name</label>
            <input
              className='ubuntu-light'
              id='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className='ubuntu-light form-field'>
            <label htmlFor='gender'>Gender</label>
            <input
              className='ubuntu-light'
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className='button-group'>
            <button className='ubuntu-light' onClick={(e) => doUpdate(e)}>
              Update
            </button>
          </div>
        </form>
      </CenteredForm>
    </div>
  );
}
