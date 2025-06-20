import axios, { AxiosError, type AxiosResponse } from "axios";
import type { AuthData, Profile, UserRegistration } from "../types/auth";
import type { Token, RefreshToken } from "../types/auth";
import { redirect } from "react-router";

const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (refreshToken) {
//           const response: Token = await refreshSession({ refreshToken });
//           localStorage.setItem("refreshToken", response.refreshToken);
//           return api.request(originalRequest);
//         }
//       } catch (error) {
//         return redirect("/auth");
//       }
//     }
//   }
// );

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

    const resData: Profile = await response.data;
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
