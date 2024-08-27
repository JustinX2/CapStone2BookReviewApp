import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import './BookDetails.css';

function BookDetails() {
  const [book, setBook] = useState(null);
  const [comment, setComment]=useState('');
  const [message, setMessage]=useState('');
  const { id } = useParams();
  
  const { likeBook, dislikeBook, addReview }=useContext(BookContext);

  useEffect(() => {
    const fetchBook=async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setMessage('Failed to load book details.');
      }
    };

    fetchBook();
  }, [id]);

  const handleLike=() => {
    if (book) {
      likeBook({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail
      });
      setMessage('Book added to favorites!');

      // SQL for managing likes on the server side
      /*
      try {
        await axios.post('http://localhost:5000/api/books/like', 
          { bookId: id, title: book.volumeInfo.title }, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setMessage('Book added to favorites!');
      } catch (error) {
        console.error('Error liking book:', error);
        setMessage('Failed to add book to favorites.');
      }
      */
    }
  };

  const handleDislike=() => {
    if (book) {
      dislikeBook({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail
      });
      setMessage('Book added to dislikes!');
  
      // SQL for managing dislikes on the server side
      /*
      try {
        await axios.post('http://localhost:5000/api/books/dislike', 
          { bookId: id, title: book.volumeInfo.title }, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setMessage('Book added to dislikes!');
      } catch (error) {
        console.error('Error disliking book:', error);
        setMessage('Failed to add book to dislikes.');
      }
      */
    }
  };  

  const handleComment=(e) => {
    e.preventDefault();
    if (book) {
      addReview({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail
      }, comment);
      setMessage('Comment added successfully!');
      setComment('');

      // SQL for managing comments on the server side
      /*
      try {
        await axios.post('http://localhost:5000/api/books/review', 
          { bookId: id, comment, title: book.volumeInfo.title }, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setMessage('Comment added successfully!');
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
        setMessage('Failed to add comment.');
      }
      */
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h1>{book.volumeInfo.title}</h1>
      {message && <div className="alert-message">{message}</div>}
      <div className="book-info">
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
        <div className="book-text">
          <p><strong>Author(s):</strong> {book.volumeInfo.authors?.join(', ')}</p>
          <p><strong>Description:</strong> {book.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
          <div className="book-actions">
            <button onClick={handleLike} className="btn btn-primary">Like</button>
            <button onClick={handleDislike} className="btn btn-secondary">Dislike</button>
          </div>
          <form onSubmit={handleComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" className="btn btn-primary">Submit Comment</button>
          </form>
        </div>
      </div>
      <Link to="/home" className="btn btn-secondary">Back to Home</Link>
    </div>
  );
}

export default BookDetails;