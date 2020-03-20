import { api } from '../../services/api';
import { TOKEN_KEY } from '../../authentication/authService';

const login = userData => {
  try {
    return api.post('/authenticate', userData).then(response => {
      return response.data;
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const loginService = {
  login,
  logout
};
