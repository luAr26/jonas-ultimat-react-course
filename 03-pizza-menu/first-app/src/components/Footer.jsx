import React from "react";
import Order from "./Order";
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 21;
  const isOpen = hour >= openHour && hour < closeHour;
  if (isOpen) return <Order closeHour={closeHour} />;
  if (!isOpen)
    return (
      <p>
        We are happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    );
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're currently open. We're open until {closeHour}:00.</p>
          <button className="btn">Order now</button>
        </div>
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
};

export default Footer;
