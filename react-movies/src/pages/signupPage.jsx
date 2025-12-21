import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router";
import { AuthContext } from '../contexts/authContext';
import '../main.css';

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  
  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      let result = await context.register(userName, password);
      setRegistered(result);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Register a username and password to log in. Usernames must be unique and passwords must contain a minimum of 8 characters (with at least one uppercase letter, one lowercase letter, and one symbol).
          </p>
        </div>
        
        <div className="auth-form">
          <div className="input-group">
            <label className="input-label" htmlFor="username">Username</label>
            <input 
              id="username"
              value={userName} 
              placeholder="Enter your username" 
              className="auth-input"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input 
              id="password"
              value={password} 
              type="password" 
              placeholder="Enter your password" 
              className="auth-input"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="passwordAgain">Confirm Password</label>
            <input 
              id="passwordAgain"
              value={passwordAgain} 
              type="password" 
              placeholder="Re-enter your password" 
              className="auth-input"
              onChange={e => setPasswordAgain(e.target.value)}
            />
          </div>
          
          <button onClick={register} className="auth-button">
            Register
          </button>
          
          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account? <Link to="/login" className="auth-link">Log In!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;