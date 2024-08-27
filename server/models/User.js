const db=require('../config/db');
const bcrypt=require('bcryptjs');

class User {
  static async findById(userId) {
    const result = await db.query(
      'SELECT id, username, password FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0];
  }

  static async create(username, password) {
    try {
      const hashedPassword=await bcrypt.hash(password, 10);
      const result = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
        [username, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await db.query('SELECT id, username FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  static async updateUsername(id, newUsername) {
    try {
      const result = await db.query(
        'UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username',
        [newUsername, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in updateUsername:', error);
      throw error;
    }
  }

  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await db.query(
        'UPDATE users SET password = $1 WHERE id = $2 RETURNING id',
        [hashedPassword, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error in updatePassword:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }

  static async comparePassword(plainTextPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      console.error('Error in comparePassword:', error);
      throw error;
    }
  }
}

module.exports = User;