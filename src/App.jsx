import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';


import { About } from './about/about';
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
          
            <div className='navbar-brand'>
              Created <sup></sup>
            </div>
            <menu className='navbar-nav'>
              
              
              
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  Created by Sophie Taylor
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
           
          
          <Route path='/about' element={<About />} />
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
