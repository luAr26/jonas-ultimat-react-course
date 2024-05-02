/** @format */

import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((item) => (
        <MenuItem key={item.id} pizza={item} />
      ))}
    </ul>
  );
}

export default Menu;
