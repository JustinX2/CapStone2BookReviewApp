# The Book Review App using Google Books API

The Book Review App is a full-stack application using React and Express that allows users to search for books, view book details, like and dislike books as well as to review books. 

## Technologies Used
- **Front-End**: React, CSS
- **Back-End**: Express, Node.js
- **Database**: PostgreSQL
- **API**: Google Books API

## Setup Instructions
- Update Database URL to your own PSQL database URL. DATABASE_URL=your-own-PSQL-database-url
- This link is located in server/.env file

## Project Overview

This application allows users to:
- Register and log in.
- Search for books using the Google Books API.
- View detailed information about books.
- Add books to their favorites or dislikes.
- Write reviews for books.

## Webpage Flows

### 1. **Authentication**
- **Registration and Login**: 
  - New users can register and Login using username and password credentials
![FrontPage Screenshot](https://i.imgur.com/feJQzwN.png)


### 2. **Home Page**
- **Search for Books**: 
  - Users can search for books using the search bar. There is also auto-suggestion based on words users type. Auto-suggestion fetches book titles from the Google Books API
![SearchBar Screenshot](https://i.imgur.com/AEjqhmD.png)

- **View Book Details**: 
  - Clicking on a book from the search results or the book lists redirects to the book details page.
![BookDetails Screenshot](https://i.imgur.com/lBOwBhO.png)

### 3. **Favorites and Dislikes**

- **Favorites**: 
  - Users can add books to favorites list by clicking the "Like" button on the book details page.
![Favorites Screenshot](https://imgur.com/fNged9O.png)
![Favorites Page Screenshot](https://i.imgur.com/BsyzPMj.png)

- **Dislikes**: 
  - Users can add books to their dislikes list by clicking the "Dislike" button on the book details page.
![Dislikes Screenshot](https://imgur.com/xP0KV8I.png)
![Dislikes Page Screenshot](https://imgur.com/s3UVnbq.png)

### 4. **Review**

- **Add a Review**: 
  - Users can add a review to a book from the book details page. Users can also view the reviews they have written as a list on the "Reviews" page.
![Review Screenshot](https://imgur.com/28omgLu.png)
![Reviews Page Screenshot](https://imgur.com/lEiiP7T.png)

