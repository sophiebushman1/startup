import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import './CAstyle.css'; // Import your CSS here


export function CreateAccount(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null); // State for success message

  const navigate = useNavigate();

  // Function to create the user
  async function createUser() {
    if (password !== confirmPassword) {
      setDisplayError("Passwords don't match.");
      return;
    }
    try {
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
    } catch (error) {
      setDisplayError("An error occurred while creating the account. Please try again.");
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg || 'Something went wrong');
    }
    return data;
  }

  return (
    <div>
      <header>
        <h1>Cocojewel</h1>
        <p className="creator-name">Created by Sophia Bushman</p>
        
      </header>

      <main>
        <section id="create-account-section">
          <h2>Create a new account</h2>
          
          <form id="create-account-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Enter your email"
            />
            <br />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <br />

            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
            <br />
            
            <Button onClick={createUser}>Create Account</Button>
          </form>

          {/* Display success message */}
          {successMessage && <MessageDialog message={successMessage} />}
          {/* Display error message */}
          {displayError && <MessageDialog message={displayError} />}
          
          <p>Already have an account? <a href="/">Log in here</a></p>
        </section>
      </main>

      <footer>
        
      </footer>
    </div>
  );
}
