import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx';
import CreateAcccount from './components/CreateAccount.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAcccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
