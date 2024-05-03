/** @format */

import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// import { useState } from "react";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const username = useSelector((state) => state.user.username);

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

        <div className="mb-5 flex flex-col gap-2 sm:mb-7 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
          <label className="sm:basis-40">Address</label>
          <input
            type="text"
            name="address"
            required
            className="input"
            placeholder="123 Main St, City, ZIP code"
          />
        </div>

        <div className="mb-8 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
