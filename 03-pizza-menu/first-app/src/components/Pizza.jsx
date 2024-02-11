import React from "react";

const Pizza = ({ name, ingredients, photoName, price, soldOut }) => {
  return (
    <li className={soldOut ? " pizza sold-out" : "pizza"}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
};

export default Pizza;
