/** @format */

import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex flex-col items-center justify-between gap-2 border-b-8 border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:flex-row sm:px-6">
      <Link to="/" className="font-bold tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
