// Sumnay Cosmetic — API base config
// Change this if your backend runs on a different host/port.
const API_BASE = 'http://localhost:5000/api';

function getAuthToken() {
  return localStorage.getItem('sumnay_token');
}

function setAuthToken(token) {
  localStorage.setItem('sumnay_token', token);
}

function clearAuthToken() {
  localStorage.removeItem('sumnay_token');
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('sumnay_user'));
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem('sumnay_user', JSON.stringify(user));
}
