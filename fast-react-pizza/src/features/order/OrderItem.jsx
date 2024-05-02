/** @format */

import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";

function OrderItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }),
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.array,
};
OrderItem.defaultProps = {
  isLoadingIngredients: false,
  ingredients: [],
};
