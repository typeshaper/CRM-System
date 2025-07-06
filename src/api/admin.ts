import { AxiosError, type AxiosResponse } from "axios";
import { api } from "./index";
import type { Profile, ProfileRequest } from "../types/user";

import type {
  User,
  UserFilters,
  UserRolesRequest,
  UsersMetaResponse,
} from "../types/admin.ts";

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
      method: "put",
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

export async function deleteUser(id: Profile["id"]): Promise<void> {
  try {
    await api({
      method: "delete",
      url: `admin/users/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function blockUser(id: Profile["id"]): Promise<Profile> {
  try {
    const response: AxiosResponse<Profile> = await api({
      method: "post",
      url: `admin/users/${id}/block`,
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

export async function unblockUser(id: Profile["id"]): Promise<Profile> {
  try {
    const response: AxiosResponse<Profile> = await api({
      method: "post",
      url: `admin/users/${id}/unblock`,
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
// 3. Обновление прав пользователя
// Method: PUT
// URL: /admin/users/{id}/rights
// Request: UserRolesRequest
// Response: User

export async function editRoles(
  id: Profile["id"],
  roles: UserRolesRequest
): Promise<User> {
  try {
    const response: AxiosResponse<User> = await api({
      method: "put",
      url: `admin/users/${id}/rights`,
      headers: {
        "Content-Type": "application/json",
      },
      data: roles,
    });

    const resData = response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
