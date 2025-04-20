export const logoutUser = () => {
  localStorage.clear();
  window.location.href = "/auth/login";
};
