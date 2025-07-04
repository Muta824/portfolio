"use server"

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { redirect } from "next/navigation";

const SIGNIN_ERROR_URL = "/error";

export async function signInWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.error("Sign in error:", error);
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    } 
    throw error;
  }
}

export async function signInWithProvider(formData: FormData) {
  const providerId = formData.get("providerId") as string;
  const redirectTo = formData.get("callbackUrl") as string;
  try {
    await signIn(providerId, { redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    } 
    console.error("Provider sign in error:", error);
    throw error;
  }
}