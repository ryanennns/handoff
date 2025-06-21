import axios from "axios";
import {
  Service as ServiceEnum,
  type Service,
  type TransferJob,
} from "~/Types/core";

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
  return config;
});

export const getEnabledServices = async (): Promise<Service[]> => {
  const response = await api.get("/services");
  const data = response.data.services;
  return Object.values(ServiceEnum).filter((service) =>
    data.includes(service),
  ) as Service[];
};

export const getTransferJobs = async (): Promise<TransferJob[]> => {
  const response = await api.get("/playlist-transfers");
  return response.data.data as TransferJob[];
};
