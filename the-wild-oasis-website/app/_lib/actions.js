/** @format */

"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

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

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be signed in to create a reservation");
}

export async function deleteReservation(bookingId) {
  // For testing the optimistic UI
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error("Reservation could not be deleted");
  const session = await auth();
  if (!session)
    throw new Error("You must be signed in to delete a reservation");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You do not have permission to delete this reservation");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Reservation could not be deleted");
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  // 1) Authentication

  const session = await auth();
  if (!session) throw new Error("You must be signed in to edit a reservation");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const bookingId = formData.get("bookingId");

  if (!guestBookingIds.includes(Number(bookingId)))
    throw new Error("You do not have permission to edit this reservation");

  // 3) Building the updated fields
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 500);
  const updatedFields = { numGuests, observations };

  // 4) Update the booking
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  // 5) Handle errors
  if (error) throw new Error("Booking could not be updated");

  // 6) Re-validation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirect to the reservations page
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
