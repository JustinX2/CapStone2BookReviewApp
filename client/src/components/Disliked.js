import React, {useContext, useEffect} from 'react';
import {BookContext} from '../context/BookContext';
import {Link} from 'react-router-dom';
import './Disliked.css';

function Disliked() {
  const {dislikes} = useContext(BookContext);

  useEffect(() => {
    console.log('Dislikes:', dislikes);
  }, [dislikes]);

  return (
    <div className="dislikes">
      <h1 class="title-list">Disliked Books</h1>
      {dislikes.length===0 ? (
        <p>No books disliked yet.</p>
      ) : (
        <ul>
          {dislikes.map((book) => (
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

export default Disliked;
