import axios from "axios";
import authService from "../services/authService";

export const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${authService.getAccessToken()}`;
  return config;
});
