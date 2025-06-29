import { AxiosError, type AxiosResponse } from "axios";
import { api } from "./index";
import type { Profile } from "../types/user";

export async function getCurrentUserData() {
  try {
    const response: AxiosResponse = await api({
      method: "get",
      url: "user/profile",
      headers: {
        accept: "application/json",
      },
    });

    const resData: Profile = await response.data;
    return resData;
  } catch (error: unknown) {
    throw error as AxiosError;
  }
}
