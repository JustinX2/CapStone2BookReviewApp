import React, {useState} from 'react';
import axios from 'axios';
import './FrontPage.css';

function FrontPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit=async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${isLogin ? 'login' : 'register'}`, {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="front-page">
      <div className="auth-container">
        <img 
          src="https://www.interviewsandreviews.com/uploads/2/6/5/2/2652541/bookreview_2_orig.jpg" 
          alt="Book Review" 
          className="web-image" 
        />
        <h1>Welcome to the Book Reviews App!</h1>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default FrontPage;