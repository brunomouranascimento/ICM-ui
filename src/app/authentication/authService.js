export const TOKEN_KEY = '@ICM-Token';
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem('user');
};
