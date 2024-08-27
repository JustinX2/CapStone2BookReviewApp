const express=require('express');
const User=require('../models/User');
const Book=require('../models/Book');
const db=require('../config/db');
const auth=require('../middleware/auth');

const router = express.Router();

//Fetch user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const userQuery = 'SELECT username FROM users WHERE id = $1';
    const userResult = await db.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = userResult.rows[0];
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error.message, error.stack);
    res.status(500).json({ message: 'Server error while fetching user profile' });
  }
});

//Fetch user's favorite books
router.get('/favorites', auth, async (req, res) => {
  try {
    const favorites = await Book.getFavorites(req.user.id);
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Fetch user's disliked books
router.get('/dislikes', auth, async (req, res) => {
  try {
    const dislikes = await Book.getDislikes(req.user.id);
    res.json(dislikes);
  } catch (error) {
    console.error('Error fetching dislikes:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Fetch user's reviews
router.get('/reviews', auth, async (req, res) => {
  try {
    const reviews = await Book.getReviews(req.user.id);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
