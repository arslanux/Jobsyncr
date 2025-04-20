export const userData = () => {
  const userData = JSON.parse(localStorage.getItem("login"));
  if (userData !== undefined && userData != null) {
    return userData;
  } else {
    return null;
  }
};
