DROP TABLE IF EXISTS reviews, dislikes, favorites, books;

ALTER TABLE books ALTER COLUMN id TYPE VARCHAR(255);
ALTER TABLE favorites ALTER COLUMN book_id TYPE VARCHAR(255);
ALTER TABLE dislikes ALTER COLUMN book_id TYPE VARCHAR(255);
ALTER TABLE reviews ALTER COLUMN book_id TYPE VARCHAR(255);

CREATE TABLE books (
    id VARCHAR(255) PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT[],
    description TEXT,
    thumbnail TEXT
);

CREATE TABLE favorites (
    user_id INTEGER,
    book_id VARCHAR(255),
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE dislikes (
    user_id INTEGER,
    book_id VARCHAR(255),
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    user_id INTEGER,
    book_id VARCHAR(255),
    comment TEXT,
    PRIMARY KEY (user_id, book_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);