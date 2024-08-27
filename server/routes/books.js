const express=require('express');
const axios=require('axios');
const Book=require('../models/Book');
const auth=require('../middleware/auth');

const router = express.Router();

//Fetch books from Google Books API
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Like a book
router.post('/like', auth, async (req, res) => {
  try {
    const { bookId, title } = req.body;
    await Book.addFavorite(req.user.id, bookId, title);
    res.json({ message: 'Book added to favorites' });
  } catch (error) {
    console.error('Error liking book:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Dislike a book
router.post('/dislike', auth, async (req, res) => {
  try {
    const { bookId, title } = req.body;
    await Book.addDislike(req.user.id, bookId, title);
    res.json({ message: 'Book added to dislikes' });
  } catch (error) {
    console.error('Error disliking book:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Add a review to a book
router.post('/review', auth, async (req, res) => {
  try {
    const { bookId, comment, title } = req.body;
    await Book.addReview(req.user.id, bookId, comment, title);
    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
