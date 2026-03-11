import axios from "axios";
import type { AxiosInstance } from "axios";
import { getToken, isTokenExpired, removeToken } from "./auth";

type AuthApi = AxiosInstance & {
  registerUnauthorizedHandler: (handler: () => void) => void;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
}) as AuthApi;

let unauthorizedHandler: (() => void) | null = null;

api.registerUnauthorizedHandler = (handler: () => void) => {
  unauthorizedHandler = handler;
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (!token) {
    return config;
  }

  if (isTokenExpired(token)) {
    removeToken();
    unauthorizedHandler?.();
    return Promise.reject(new Error("Token expired"));
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = String(error?.response?.data?.error || "").toLowerCase();
    if (status === 401 || message.includes("expired") || message.includes("invalid token")) {
      removeToken();
      unauthorizedHandler?.();
    }

    return Promise.reject(error);
  },
);

export default api;