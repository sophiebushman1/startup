// src/login/createAccount.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function CreateAccount(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  async function createAccount() {
    const response = await fetch(`/api/auth/create`, {
      method: 'POST',
      body: JSON.stringify({ email: userName, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      // Account created successfully
      navigate('/');
    } else {
      const body = await response.json();
      setErrorMessage(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <div>
      <h2>Create Account</h2>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username: </span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter username' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password:  </span>
          <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
        </div>
        <Button variant='primary' onClick={createAccount} disabled={!userName || !password}>
          Create Account
        </Button>
        {errorMessage && <div className='text-danger'>{errorMessage}</div>}
      </div>
      <Button variant='secondary' onClick={() => navigate('/')}>
        Back to Login
      </Button>
    </div>
  );
}
