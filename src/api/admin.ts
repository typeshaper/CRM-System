import { AxiosError, type AxiosResponse } from "axios";
import { api } from "./index";
import type {
  Profile,
  ProfileRequest,
  User,
  UserFilters,
  UsersMetaResponse,
} from "../types/user";

export async function getUsersList(queryParams?: UserFilters) {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: "admin/users",
      headers: {
        accept: "application/json",
      },
      params: { ...queryParams },
    });

    const resData: UsersMetaResponse<User> = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function getUserById(id: Profile["id"]): Promise<Profile> {
  try {
    const response: AxiosResponse<Profile> = await api({
      method: "get",
      url: `admin/users/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function updateUserData(
  newData: ProfileRequest,
  id: Profile["id"]
): Promise<Profile> {
  try {
    const response: AxiosResponse<Profile> = await api({
      method: "post",
      url: `admin/users/${id}`,
      data: newData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
