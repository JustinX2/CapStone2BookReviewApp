const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const router=express.Router();

const JWT_SECRET=process.env.JWT_SECRET || 'abc123';

router.post('/register', async (req, res) => {
  try {
    console.log('Attempting to register user');
    const { username, password } = req.body;
    console.log('Received username:', username);

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser=await User.findByUsername(username);
    console.log('Existing user check result:', existingUser);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser=await User.create(username, password);
    const token=jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error('Detailed registration error:', error);
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const user=await User.findByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch=await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token=jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;