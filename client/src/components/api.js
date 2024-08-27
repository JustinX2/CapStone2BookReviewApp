import axios from 'axios';

const API_URL='http://localhost:5000/api';

const api=axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register=(username, password) => api.post('/auth/register', { username, password });
export const login=(username, password) => api.post('/auth/login', { username, password });
export const logout=() => {
  localStorage.removeItem('token');
  return Promise.resolve();
};

export const getBooks=() => api.get('/books');
export const getBook=(id) => api.get(`/books/${id}`);
export const addBook=(bookData) => api.post('/books', bookData);
export const updateBook=(id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook=(id) => api.delete(`/books/${id}`);

export const getReviews=(bookId) => api.get(`/books/${bookId}/reviews`);
export const addReview=(bookId, reviewData) => api.post(`/books/${bookId}/reviews`, reviewData);
export const updateReview=(bookId, reviewId, reviewData) => api.put(`/books/${bookId}/reviews/${reviewId}`, reviewData);
export const deleteReview=(bookId, reviewId) => api.delete(`/books/${bookId}/reviews/${reviewId}`);

export const getUserProfile=() => api.get('/users/profile');
export const updateUserProfile=(userData) => api.put('/users/profile', userData);
export const changePassword=(passwordData) => api.post('/users/change-password', passwordData);

export const getFavorites=() => api.get('/users/favorites');
export const addFavorite=(bookId) => api.post(`/users/favorites/${bookId}`);
export const removeFavorite=(bookId) => api.delete(`/users/favorites/${bookId}`);

export default api;