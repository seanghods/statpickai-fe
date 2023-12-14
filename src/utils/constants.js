export const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://api.statpick.ai/api'
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
  checkSession: `${BASE_URL}/check-session`,
};
