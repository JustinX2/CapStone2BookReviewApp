import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {BookContext} from '../context/BookContext';

function BookReviews() {
  const {reviews} = useContext(BookContext);

  return (
    <div className="book-reviews">
      <h1>Book Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.bookId} className="review-item">
            <h2>{review.title}</h2>
            <p><strong>Author:</strong> {review.authors.join(', ')}</p>
            <p><strong>User Review:</strong> {review.comment}</p>
            <Link to={`/book/${review.bookId}`}>View Book Details</Link>
          </div>
        ))
      )}
      <Link to="/home" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
}

export default BookReviews;

//Using SQL on the server side to manage reviews instead of using React
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="book-reviews">
      <h1>Book Reviews</h1>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <h3>{review.book_title}</h3>
            <p>Reviewed by: {review.username}</p>
            <p>{review.comment}</p>
            <Link to={`/book/${review.book_id}`}>View Book Details</Link>
          </div>
        ))}
      </div>
      <Link to="/home">Back to Home</Link>
    </div>
  );
}

export default BookReviews;
*/
