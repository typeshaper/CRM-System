import { AxiosError, type AxiosResponse } from "axios";
import { api } from "./index";
import type { AuthData, UserRegistration } from "../types/auth";
import type { Token, RefreshToken } from "../types/auth";

export async function login(loginData: AuthData) {
  try {
    const response: AxiosResponse = await api({
      method: "post",
      url: "/auth/signin",
      data: loginData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: Token = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function signup(userData: UserRegistration) {
  try {
    const response: AxiosResponse = await api({
      method: "post",
      url: "/auth/signup",
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData: UserRegistration = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function refreshSession(refreshToken: RefreshToken) {
  try {
    const response: AxiosResponse = await api({
      method: "post",
      url: "/auth/refresh",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: refreshToken,
    });

    const resData: Token = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}

export async function logout(accessToken: string) {
  try {
    const response: AxiosResponse = await api({
      method: "post",
      url: "user/logout",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
