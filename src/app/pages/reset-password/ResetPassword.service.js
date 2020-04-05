import { api } from '../../services/api';

const checkToken = async token => {
  const response = await api.get(`/check-token/${token}`);
  return response.data;
};
const resetPassword = async userData => {
  const { token, password } = userData;
  const response = await api.post(`/reset-password/${token}`, { password });
  return response.data;
};

export const resetPasswordService = {
  checkToken,
  resetPassword
};
