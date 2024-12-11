import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function CreateAccount(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null); // State for success message

  const navigate = useNavigate();

  // Function to create the user
  async function createUser() {
    const response = await loginOrCreate(`/api/auth/create`);
    console.log("Response from backend:", response); // Log full response

    if (response?.status === 200) {
      // Show success message on user creation
      setSuccessMessage(response?.msg || "Account created successfully! You can now log in.");
      setTimeout(() => {
        navigate('/'); // Optionally navigate to the login page after 2 seconds
      }, 2000);
    } else {
      // Show error message if something goes wrong
      setDisplayError(`⚠ Error: ${response?.msg || 'Something went wrong'}`);
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
    console.log('log in or create response', response);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg || 'Something went wrong');
    }
    return data;
  }

  return (
    <div>
      <h3>Create New Account</h3>
      <label>Email:</label>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
      />
      <br />
      <label>Password:</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <br />
      <Button onClick={createUser}>Create Account</Button>

      {/* Display success message */}
      {successMessage && <MessageDialog message={successMessage} />}
      {/* Display error message */}
      {displayError && <MessageDialog message={displayError} />}
    </div>
  );
}
