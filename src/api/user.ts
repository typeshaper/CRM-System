import { AxiosError, type AxiosResponse } from "axios";
import type { Profile } from "../types/user";
import { api } from "./index";

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
