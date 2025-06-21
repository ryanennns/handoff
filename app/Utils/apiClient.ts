import axios from "axios";

export const getToken = (): string | null => {
  const match = document.cookie.match(/(^| )auth_token=([^;]+)/);
  return match ? match[2] : null;
};

export const api = axios.create({
  baseURL: "https://handoff-api.enns.dev/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log({ headers: config.headers });
  return config;
});
