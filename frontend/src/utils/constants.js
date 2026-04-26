export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const COLORS = {
  indigoNight: '#102542',
  crimsonRose: '#D1495B',
  success: '#34d399',
  warning: '#fbbf24',
  info: '#60a5fa',
  danger: '#f87171',
  purple: '#a78bfa',
  orange: '#fb923c',
};

export const CATEGORIES = {
  expenses: ['food', 'transport', 'books', 'entertainment', 'clothing', 'recharge', 'medical', 'other'],
  complaints: ['maintenance', 'wifi', 'food', 'cleanliness', 'electricity', 'water', 'security', 'other'],
  marketplace: ['books', 'electronics', 'stationery', 'clothing', 'furniture', 'other'],
  lostfound: ['electronics', 'documents', 'accessories', 'clothing', 'keys', 'other'],
};

export const EXPENSE_COLORS = {
  food: '#fb923c',
  transport: '#60a5fa',
  books: '#a78bfa',
  entertainment: '#f472b6',
  clothing: '#34d399',
  recharge: '#fbbf24',
  medical: '#f87171',
  other: '#94a3b8',
};

export const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
