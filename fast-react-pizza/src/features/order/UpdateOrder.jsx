import PropTypes from "prop-types";
import Button from "./../../ui/Button";
import { useFetcher } from "react-router-dom";
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  console.log(order);

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

/* 
id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
*/

UpdateOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.bool.isRequired,
    priorityPrice: PropTypes.number.isRequired,
    orderPrice: PropTypes.number.isRequired,
    estimatedDelivery: PropTypes.string.isRequired,
    cart: PropTypes.arrayOf(
      PropTypes.shape({
        pizzaId: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        totalPrice: PropTypes.number.isRequired,
        addIngredients: PropTypes.arrayOf(PropTypes.string),
        removeIngredients: PropTypes.arrayOf(PropTypes.string),
        unitPrice: PropTypes.number,
      }),
    ),
  }),
};
export default UpdateOrder;
