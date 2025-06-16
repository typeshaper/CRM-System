import axios, { AxiosError, type AxiosResponse } from "axios";
import type { AuthData } from "../types/auth";
import type { Token } from "../types/auth";

const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

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
