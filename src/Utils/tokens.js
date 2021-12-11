const getToken = () => {
  console.log(localStorage.getItem("token"))
  if (!!localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token");
  }
};
const getRefreshToken = () => {
  if (!!localStorage.getItem("refreshToken")) {
    return localStorage.getItem("refreshToken");
  }
};

const setTokens = (res) => {
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("refreshToken", res.data.refreshToken);
};
export { getToken, getRefreshToken, setTokens };
