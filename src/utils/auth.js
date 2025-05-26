
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const logout = async () => {
  try {
    await axios.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
  localStorage.removeItem('user');
};