import React from 'react';
import './LoginPage.css';
import LoginForm from './LoginForm';
import logo from '../../images/sassoon-academy-logo.png';

const LoginPage = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <h1>SASSOON</h1>
      </header>
      <main className="login-main">
      <img 
        src={logo}
        alt="logo" 
        className="logo-image" 
      />
        <h2>LOGIN</h2>
        <LoginForm />
      </main>
      <footer className="login-footer">
        <p>&copy; 2024 SASSOON ACADEMY</p>
      </footer>
    </div>
  );
};

export default LoginPage;
