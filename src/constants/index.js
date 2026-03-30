// API endpoints and constants
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  NOTES: '/notes',
  NOTE_BY_ID: (id) => `/notes/${id}`,
};

export const MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Your account has been created.',
  NOTE_CREATED: 'Your new note has been added.',
  NOTE_UPDATED: 'Your note has been saved.',
  NOTE_DELETED: 'Your note has been deleted.',
  LOGIN_ERROR: 'Login failed',
  REGISTER_ERROR: 'Registration failed',
  SAVE_ERROR: 'Failed to save note',
  DELETE_ERROR: 'Failed to delete note',
  FETCH_ERROR: 'Failed to fetch notes',
};

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  TITLE_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 5000,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};