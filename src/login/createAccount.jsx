import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './CAstyle.css'; // Import your CSS here

export function CreateAccount(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState(null); // Simplified message state (Success only)

  const navigate = useNavigate();

  // Function to create the user
  async function createUser() {
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: "Passwords don't match." });
      return;
    }
    try {
      const response = await loginOrCreate(`/api/auth/create`);
      console.log("Response from backend:", response); // Log full response

      if (response?.status === 200) {
        // If the backend returns status 200, we show success message
        setMessage({ type: 'success', text: response?.msg || "Account created successfully! You can now log in." });
        setTimeout(() => {
          navigate('/'); // Optionally navigate to the login page after 2 seconds
        }, 2000);
      } else {
        // In case the backend status is not 200, display it as an error
        setMessage({ type: 'error', text: response?.msg || 'Account creation failed. Please try again.' });
      }
    } catch (error) {
      // Handle the case where there was an error in fetching the API
      setMessage({ type: 'error', text: "An error occurred while creating the account. Please try again." });
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

          {/* Display message (success or error) */}
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <p>Have an account? <a href="/">Log in here</a></p>
        </section>
      </main>

      <footer>
        {/* Add footer content if necessary */}
      </footer>
    </div>
  );
}
