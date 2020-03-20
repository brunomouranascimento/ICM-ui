import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://icm-core.herokuapp.com'
});
