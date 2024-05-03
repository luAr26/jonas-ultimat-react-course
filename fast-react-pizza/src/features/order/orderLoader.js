/** @format */

import { getOrder } from "../../services/apiRestaurant";

export async function orderLoader({ params }) {
  const order = await getOrder(params.id);
  return order;
}
