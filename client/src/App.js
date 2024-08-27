import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FrontPage from './components/FrontPage';
import HomePage from './components/HomePage';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';
import Disliked from './components/Disliked';
import BookReviews from './components/BookReviews';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import {BookProvider} from './context/BookContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <BookProvider>
      <Router>
        <div className="App">
          {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
          <Routes>
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/home" /> : <FrontPage setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/home" /> : <Register />
            } />
            <Route path="/home" element={
              isAuthenticated ? <HomePage /> : <Navigate to="/" />
            } />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/favorites" element={
              isAuthenticated ? <Favorites /> : <Navigate to="/" />
            } />
            <Route path="/disliked" element={
              isAuthenticated ? <Disliked /> : <Navigate to="/" />
            } />
            <Route path="/reviews" element={<BookReviews />} />
            <Route path="/profile" element={
              isAuthenticated ? <UserProfile /> : <Navigate to="/" />
            } />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;