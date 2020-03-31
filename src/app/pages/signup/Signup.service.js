import { api } from '../../services/api';

const signup = async userData => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const signupService = {
  signup
};
