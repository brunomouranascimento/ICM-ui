export const TOKEN_KEY = '@ICM-Token';
export const USER_KEY = '@ICM-User';
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const setUser = user => {
  localStorage.setItem(USER_KEY, user);
};

export const authService = {
  setToken,
  setUser
};
