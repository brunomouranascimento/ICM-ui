import { api } from '../../services/api';
import { TOKEN_KEY } from '../../authentication/authService';

async function login(userData) {
  const response = await api.post('/authenticate', userData);
  return response.data;
}

async function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export const loginService = {
  login,
  logout
};
