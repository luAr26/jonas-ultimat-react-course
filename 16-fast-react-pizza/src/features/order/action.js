/** @format */

import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/helpers";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const cart = JSON.parse(data.cart);

  const order = {
    ...data,
    cart,
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If the phone number is valid, we can create the order and redirect to the order page
  const newOrder = await createOrder(order);
  store.dispatch(clearCart()); // Clear the cart after the order is created - NOT USE THIS IN REAL WORLD

  return redirect(`/order/${newOrder.id}`);
}
