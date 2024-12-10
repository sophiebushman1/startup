// src/app.jsx

import React from 'react';


import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { CreateAccount } from './login/createAccount'; // Import CreateAccount
import { Policy } from './policy/policy';

import { AuthState } from './login/authState';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className='container-fluid'>
          <menu className='menu'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='policy'>
                Policy
              </NavLink>
            </li>
          </menu>
        </header>

        <Routes>
          <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/createAccount' element={<CreateAccount />} /> {/* Add Create Account route */}
          <Route path='/policy' element={<Policy />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className='bg-dark text-dark text-muted'>
          <div className='container-fluid'>
            <span className='text-reset'>Created by Sophia Bushman</span>
            <a className='text-reset' href='https://github.com/sophiebushman1/startup'>
              Github Link
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
