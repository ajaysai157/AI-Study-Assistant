import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const pathname = window.location.pathname;
      const isAuthRoute = pathname === "/login" || pathname === "/register";

      if (!isAuthRoute) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
