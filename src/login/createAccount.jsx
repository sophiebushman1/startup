import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function CreateAccount(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null); // Add state for success message

  const navigate = useNavigate(); // Navigate to login after account creation if needed

  // Function to create the user
  async function createUser() {
    const response = await loginOrCreate(`/api/auth/create`);
    if (response?.status === 200) {
      setSuccessMessage("Account created successfully! You can now log in.");
      setTimeout(() => {
        navigate('/'); // Optionally navigate to the login page after 2 seconds
      }, 2000);
    }
  }

  // Function to handle the create user API call
  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response?.status === 200) {
      // User created successfully
      return response;
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <div>
      {/* Success message after user creation */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {/* Error message if there is any */}
      {displayError && <div className="alert alert-danger">{displayError}</div>}

      <div className='input-group mb-3'>
        <span className='input-group-text'>Username: </span>
        <input 
          className='form-control' 
          type='text' 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          placeholder='Enter username here' 
        />
      </div>
      <div className='input-group mb-3'>
        <span className='input-group-text'>Password: </span>
        <input 
          className='form-control' 
          type='password' 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Enter password here' 
        />
      </div>
      <Button variant='primary' onClick={createUser} disabled={!userName || !password}>
        Create Account
      </Button>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </div>
  );
}
