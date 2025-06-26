export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordRequest {
  password: string;
}

export type Role = "ADMIN" | "USER" | "MODERATOR";

export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  offset?: number; // страницу
}

export interface UsersMetaResponse<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
