import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && credentials.password !== credentials.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onLogin(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkip = () => {
    onLogin({ skip: true });
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setCredentials({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          )}
          <button type="submit" className="login-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="login-options">
          <button 
            type="button" 
            className="toggle-mode-btn"
            onClick={toggleMode}
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
          <button 
            type="button" 
            className="skip-btn"
            onClick={handleSkip}
          >
            Skip Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 