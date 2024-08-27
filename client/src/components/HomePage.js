import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {debounce} from 'lodash';
import './HomePage.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const GOOGLE_BOOKS_API_KEY='AIzaSyCFYK49GHRvjQNCIWqgIO7N-ZNiw5nzlMY';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const debouncedFetchSuggestions=debounce(async (term) => {
    if (term.length > 0) {
      try {
        const response=await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=5&key=${GOOGLE_BOOKS_API_KEY}`
        );
        const data=await response.json();
        setSuggestions(data.items || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    debouncedFetchSuggestions(searchTerm);
    return () => debouncedFetchSuggestions.cancel();
  }, [searchTerm, debouncedFetchSuggestions]);

  const handleSearch=async (e) => {
    e.preventDefault();

    if (!searchTerm) {
      alert('Please enter a search term.');
      return;
    }

    try {
      const response=await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${GOOGLE_BOOKS_API_KEY}`
      );
      const data=await response.json();

      if (data.items && data.items.length > 0) {
        setBooks(data.items);
        navigate(`/book/${data.items[0].id}`);
      } else {
        alert('No book found with that title.');
      }
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
      alert('There was an error searching for the book. Please try again later.');
    }
  };

  const handleSelectSuggestion=(book) => {
    setSearchTerm(book.volumeInfo.title);
    setSuggestions([]);
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="home-page">
      <h1 class="title-list">Book List</h1>
      <div className="search-bar-container">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {suggestions.length > 0 && (
          <ul className={`suggestions-dropdown ${suggestions.length > 0 ? 'show' : ''}`}>
            {suggestions.map((book) => (
              <li
                key={book.id}
                onClick={() => handleSelectSuggestion(book)}
                className="suggestion-item"
              >
                {book.volumeInfo.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <Link to={`/book/${book.id}`} className="view-details-btn">View Details</Link>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;