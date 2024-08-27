const express=require('express');
const bcrypt=require('bcrypt');
const db=require('../config/db');

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
        const existingUserResult = await db.query(existingUserQuery, [username]);

        if (existingUserResult.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        await db.query(insertUserQuery, [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await db.query(userQuery, [username]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
