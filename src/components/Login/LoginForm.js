import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use navigate for navigation in React Router v6

const LoginForm = () => {
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructing the payload for login
    const loginData = {
      Username: username, // Changed from Email to Username
      Password: password,
    };

    console.log('loginData', loginData);

    try {
      // Sending POST request to the API
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        loginData
      );

      // If login is successful (status 200), navigate to dashboard
      if (response.status === 200) {

        // Save token in localStorage
        localStorage.setItem('sassoontoken', response.data.token);

        // Redirect to dashboard
        navigate('/');
      }
    } catch (error) {
      // If error occurs, display error message
      setErrorMessage('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="input-group">
        <label htmlFor="username">Username</label> {/* Updated label */}
        <input
          type="text"
          id="username"
          value={username} // Changed from email to username
          onChange={(e) => setUsername(e.target.value)} // Updated state setter
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" className="login-btn">
        Login
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
