"use server";

import { cookies } from "next/headers";

import { USER_ROLE } from "@/types/user";

export const createUserCookie = async (role: string) => {
  const cookieStore = await cookies();
  cookieStore.set("USER_ROLE", role);
};

export const getUserCookie = async () => {
  const cookieStore = await cookies();
  const userRole = cookieStore.get("USER_ROLE");
  return userRole?.value as USER_ROLE | undefined;
};
