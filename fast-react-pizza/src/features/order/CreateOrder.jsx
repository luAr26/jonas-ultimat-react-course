/** @format */

import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAddress } from "../user/userSlice";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import EmptyCart from "./../cart/EmptyCart";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  let totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  totalCartPrice += priorityPrice;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="p-4 py-6">
      <h2 className="mb-8 text-xl font-semibold tracking-tighter">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST" action="/order/new">
        <div className="mb-3 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <label className="sm:basis-40" htmlFor="first-name">
            First Name
          </label>
          <input
            className="input grow-0"
            type="text"
            name="customer"
            required
            id="first-name"
            defaultValue={username}
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <label className="sm:basis-40" htmlFor="phone">
            Phone number
          </label>
          <input
            className="input"
            type="tel"
            name="phone"
            required
            id="phone"
          />
        </div>
        {formErrors?.phone && (
          <p className="mb-3 rounded-full border border-red-300 bg-red-50 px-8 py-2 font-semibold text-red-600 sm:mb-5">
            {formErrors.phone}
          </p>
        )}

        <div className="relative mb-5 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <label className="sm:basis-40">Address</label>
          <input
            type="text"
            name="address"
            required
            className="input"
            placeholder="123 Main St, City, ZIP code"
            disabled={isLoadingAddress}
            defaultValue={address}
          />
          {!position.latitude && !position.longitude && (
            <span className="z-60 absolute right-[6px] top-[38px] sm:top-[3px] md:top-[7px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>
        {addressStatus === "error" && (
          <p className="mb-3 rounded-full border border-red-300 bg-red-50 px-8 py-2 font-semibold text-red-600 sm:mb-5">
            {errorAddress}
          </p>
        )}

        <div className="mb-8 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order"
              : `Order now for ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
