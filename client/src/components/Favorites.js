import React, {useContext} from 'react';
import {BookContext} from '../context/BookContext';
import {Link} from 'react-router-dom';
import './Favorites.css';

function Favorites() {
  const {favorites} = useContext(BookContext);

  return (
    <div className="favorites">
      <h1 class="title-list">Favorite Books</h1>
      {favorites.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/home" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
}

export default Favorites;

//Using SQL on the server side to manage favroites instead of using React
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <h1>Favorite Books</h1>
      <ul>
        {favorites.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
*/
