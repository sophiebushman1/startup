// src/login/unauthenticated.jsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import { useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username: </span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='enter username here' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password:  </span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='enter password here' />
        </div>
        <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
          Create Account
        </Button>
        <Button variant='link' onClick={() => navigate('/createAccount')}>
          Create Account (New User)
        </Button>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
