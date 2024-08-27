import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';

function Login({setIsAuthenticated}) {
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post('http://localhost:5000/api/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Welcome to the Book Reviews App!</h1>
      <div className="image-container">
        <img src="" alt="Book Review" className="auth-image" />
      </div>
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
