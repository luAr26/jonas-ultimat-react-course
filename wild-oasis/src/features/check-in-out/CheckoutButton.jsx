/** @format */

import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();
  return (
    <Button
      $variation='primary'
      $size='small'
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};

export default CheckoutButton;
