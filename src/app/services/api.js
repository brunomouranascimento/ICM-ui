import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_URL_ICM_CORE || 'http://localhost:3333'
});
