/** @format */

import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/helpers";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please enter a valid phone number. We might need to contact you about your order.";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If the phone number is valid, we can create the order and redirect to the order page
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
