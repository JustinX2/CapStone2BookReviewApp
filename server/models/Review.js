const db=require('../config/db');

class Review {
  static async create(userId, bookId, comment) {
    const result = await db.query(
      'INSERT INTO reviews (user_id, book_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, bookId, comment]
    );
    return result.rows[0];
  }
  
  static async getByBookId(bookId) {
    const result = await db.query(
      'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.book_id = $1 ORDER BY r.created_at DESC',
      [bookId]
    );
    return result.rows;
  }

  static async getRecentReviews(limit = 10) {
    const result = await db.query(
      'SELECT r.*, u.username, b.title as book_title FROM reviews r JOIN users u ON r.user_id = u.id JOIN books b ON r.book_id = b.id ORDER BY r.created_at DESC LIMIT $1',
      [limit]
    );
    return result.rows;
  }
}

module.exports = Review;