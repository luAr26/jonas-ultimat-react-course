import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className="sm py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6 ">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Remove</Button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }),
};

export default CartItem;
