import axios, { AxiosError, type AxiosResponse } from "axios";
import type { Profile } from "../types/user";

const api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

export async function getCurrentUserData(accessToken: string) {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: "user/profile",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const resData: Profile = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
