import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleIncreaseQuantity() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={handleDecreaseQuantity}>
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" onClick={handleIncreaseQuantity}>
        +
      </Button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
};

export default UpdateItemQuantity;
