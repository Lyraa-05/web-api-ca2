import { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router";
import React from "react";
import { AuthContext } from '../contexts/authContext';
import '../main.css';

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Log in to view your favorites and playlists</p>
                </div>
                
                <div className="auth-form">
                    <div className="input-group">
                        <label className="input-label" htmlFor="username">Username</label>
                        <input 
                            id="username" 
                            placeholder="Enter your username" 
                            className="auth-input"
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            className="auth-input"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button onClick={login} className="auth-button">
                        Log In
                    </button>
                    
                    <div className="auth-footer">
                        <p className="auth-footer-text">
                            Not registered? <Link to="/signup" className="auth-link">Sign Up!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;