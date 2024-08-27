import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Reviews.css';

function Reviews() {
  const [reviews, setReviews]=useState([]);

  useEffect(() => {
    const fetchReviews=async () => {
      try {
        const response=await axios.get('http://localhost:5000/api/users/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews">
      <h1 class="title-list">Book Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.title}: {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
