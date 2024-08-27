const db=require('../config/db');

class Book {
  static async addFavorite(userId, bookId, title) {
    console.log(`Adding favorite: userId=${userId}, bookId=${bookId}, title=${title}`);
    await db.query(
      `INSERT INTO books (id, title)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING`,
      [bookId, title]
    );
    await db.query(
      `INSERT INTO favorites (user_id, book_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, book_id) DO NOTHING`,
      [userId, bookId]
    );
  }

  static async addDislike(userId, bookId, title) {
    console.log(`Adding dislike: userId=${userId}, bookId=${bookId}, title=${title}`);
    await db.query(
      `INSERT INTO books (id, title)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING`,
      [bookId, title]
    );
    await db.query(
      `INSERT INTO dislikes (user_id, book_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, book_id) DO NOTHING`,
      [userId, bookId]
    );
  }

  static async addReview(userId, bookId, comment, title) {
    console.log(`Adding review: userId=${userId}, bookId=${bookId}, comment=${comment}, title=${title}`);
    await db.query(
      `INSERT INTO books (id, title)
       VALUES ($1, $2)
       ON CONFLICT (id) DO NOTHING`,
      [bookId, title]
    );
    await db.query(
      `INSERT INTO reviews (user_id, book_id, comment)
       VALUES ($1, $2, $3)`,
      [userId, bookId, comment]
    );
  }
}

module.exports = Book;
