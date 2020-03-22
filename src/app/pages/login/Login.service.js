import { api } from '../../services/api';
import { TOKEN_KEY } from '../../authentication/authService';

const login = async userData => {
  const response = await api.post('/authenticate', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const loginService = {
  login,
  logout
};
