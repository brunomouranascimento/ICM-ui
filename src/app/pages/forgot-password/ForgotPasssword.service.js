import { api } from '../../services/api';

const forgotPassword = async email => {
  const response = await api.post('/forgot-password', email);
  return response.data;
};

export const forgotPasswordService = {
  forgotPassword
};
