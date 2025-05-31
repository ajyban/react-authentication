import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App.jsx';
import AuthRoute from './components/AuthRoute.jsx';
import CreateAcccount from './components/CreateAccount.jsx';
import Login from './components/Login.jsx';
import './index.css';
import { NotifcationBannerProvider } from './components/notification/NotifcationBannerProvider.jsx';
import UserProfile from './components/user-profile/UserProfile.jsx';
import UserProfileProvider from './components/user-profile/UserProfileProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfileProvider>
      <NotifcationBannerProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='login' element={<Login />} />
              <Route path='create-account' element={<CreateAcccount />} />
              <Route
                path='profile'
                element={
                  <AuthRoute>
                    <UserProfile />
                  </AuthRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotifcationBannerProvider>
    </UserProfileProvider>
  </StrictMode>
);
