import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use(async (config) => {
  config.headers["Content-type"] = `application/json`;

  const token = localStorage.getItem("_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (
      error.config.url === "/users/authenticate" ||
      error.config.url === "/users/refresh-token"
    )
      return Promise.reject(error);

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("_refresh_token");
      if (refreshToken) {
        try {
          const refreshTokenData = (
            await api.post("/users/refresh-token", {
              refresh_token: refreshToken,
            })
          ).data;
          localStorage.setItem("_token", refreshTokenData.token);
          localStorage.setItem(
            "_refresh_token",
            refreshTokenData.refresh_token
          );
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${refreshTokenData.token}`;
          originalRequest._retry = true;
          return api(originalRequest);
        } catch (e) {
          localStorage.removeItem("_token");
          localStorage.removeItem("_refresh_token");
          window.location.href = "/login";
          return Promise.reject(e);
        }
      } else {
        localStorage.removeItem("_token");
        localStorage.removeItem("_refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
