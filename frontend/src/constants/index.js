// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  ASSETS: {
    BASE: '/api/assets',
    AVAILABLE: '/api/assets/available',
    BY_ID: (id) => `/api/assets/${id}`,
  },
  REQUESTS: {
    BASE: '/api/assetrequests',
    MY_REQUESTS: '/api/assetrequests/my-requests',
    PROCESS: (id) => `/api/assetrequests/${id}/process`,
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
  },
};

// Asset Categories
export const ASSET_CATEGORIES = {
  LAPTOP: 'Laptop',
  PHONE: 'Phone',
  MONITOR: 'Monitor',
  TABLET: 'Tablet',
  PRINTER: 'Printer',
  SCANNER: 'Scanner',
  OTHER: 'Other',
};

// Asset Status
export const ASSET_STATUS = {
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  MAINTENANCE: 'Maintenance',
  RETIRED: 'Retired',
};

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MESSAGE: 'Password must be at least 6 characters long',
  },
  REQUIRED: {
    MESSAGE: 'This field is required',
  },
};

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
  },
  MODAL: {
    BACKDROP_CLOSE: true,
    ESCAPE_CLOSE: true,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  LOGOUT: 'Logout successful!',
  ASSET_CREATED: 'Asset created successfully!',
  ASSET_UPDATED: 'Asset updated successfully!',
  ASSET_DELETED: 'Asset deleted successfully!',
  REQUEST_CREATED: 'Request submitted successfully!',
  REQUEST_PROCESSED: 'Request processed successfully!',
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  ACCENT: '#f093fb',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  LIGHT: '#f8fafc',
  DARK: '#1f2937',
  WHITE: '#ffffff',
  BLACK: '#000000',
};

// Breakpoints
export const BREAKPOINTS = {
  XS: '480px',
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
}; 