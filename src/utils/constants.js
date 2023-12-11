export const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://api.pickawinner.ai/api'
    : '/api';

export const DOMAIN =
  import.meta.env.MODE === 'production' ? 'www.pickawinner.ai' : 'localhost';

export const API_ROUTES = {
  games: `${BASE_URL}/games`,
};
