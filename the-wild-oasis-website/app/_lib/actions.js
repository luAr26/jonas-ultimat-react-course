/** @format */

"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be signed in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // matches strings that are alphanumeric and have a length between 6 and 12 characters
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID.");
  const updateData = { nationality, countryFlag, nationalID };

  // Update the guest
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated.");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
