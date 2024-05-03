/** @format */

import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCartItemQuantity } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import { isInCart } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const inCart = useSelector(isInCart(id));
  const currentItemQuantity = useSelector(getCartItemQuantity(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <div>
              {inCart ? (
                <div className="flex items-center gap-4 md:gap-8">
                  <UpdateItemQuantity
                    pizzaId={id}
                    currentQuantity={currentItemQuantity}
                  />
                  <DeleteItem pizzaId={id} />
                </div>
              ) : (
                <Button type="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default MenuItem;
