import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_ICM_URL_CORE || 'https://icm-core.herokuapp.com'
});
