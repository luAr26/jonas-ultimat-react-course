import React from "react";

const Order = ({ closeHour }) => {
  return (
    <div className="order">
      <p>We're currently open. We're open until {closeHour}:00.</p>
      <button className="btn">Order now</button>
    </div>
  );
};

export default Order;
