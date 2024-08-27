import React, {createContext, useState} from 'react';

export const BookContext=createContext();

export const BookProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const likeBook = (book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  const dislikeBook = (book) => {
    setDislikes((prevDislikes) => [...prevDislikes, book]);
  };

  const addReview = (book, comment) => {
    setReviews((prevReviews) => [...prevReviews, { ...book, comment }]);
  };

  return (
    <BookContext.Provider value={{ favorites, dislikes, reviews, likeBook, dislikeBook, addReview }}>
      {children}
    </BookContext.Provider>
  );
};