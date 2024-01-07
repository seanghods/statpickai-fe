export const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://api.statpickai.com/api'
    : '/api';

export const DOMAIN =
  import.meta.env.MODE === 'production' ? 'www.statpick.ai' : 'localhost';

export const API_ROUTES = {
  base: `${BASE_URL}`,
  games: `${BASE_URL}/games`,
  players: `${BASE_URL}/players`,
  message: `${BASE_URL}/message`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  signUp: `${BASE_URL}/sign-up`,
  fullAccount: `${BASE_URL}/full-account`,
  checkSession: `${BASE_URL}/check-session`,
  createSub: `${BASE_URL}/create-subscription`,
  createIntent: `${BASE_URL}/create-setup-intent`,
  allResponses: `${BASE_URL}/all-responses`,
  plans: `${BASE_URL}/plans`,
  analysis: `${BASE_URL}/analysis`,
  picks: `${BASE_URL}/popular-picks`,
  getEmail: `${BASE_URL}/get-email`,
  contactUs: `${BASE_URL}/contact-us`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
};
