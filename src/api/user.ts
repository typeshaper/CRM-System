import axios, { AxiosError, type AxiosResponse } from "axios";
import type {
  Profile,
  User,
  UserFilters,
  UsersMetaResponse,
} from "../types/user";
import authService from "../services/authService";

const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

export async function getCurrentUserData() {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: "user/profile",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${authService.getAccessToken()}`,
      },
    });

    const resData: Profile = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function getUsersList(queryParams?: UserFilters) {
  try {
    const response: UsersMetaResponse<User> = await api({
      method: "get",
      url: "admin/users",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${authService.getAccessToken()}`,
      },
      params: { ...queryParams },
    });

    const resData: User[] = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
