import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';

function Navbar({setIsAuthenticated}) {
  const navigate=useNavigate();

  const handleLogout=() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="nav-logo">
          Book Reviews App from Google Books!
        </Link>
        <div className="nav-links">
          <Link to="/home" className="nav-item">Home</Link>
          <Link to="/favorites" className="nav-item">Favorites</Link>
          <Link to="/disliked" className="nav-item">Disliked</Link>
          <Link to="/reviews" className="nav-item">Reviews</Link>
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;