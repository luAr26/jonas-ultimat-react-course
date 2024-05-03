import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-yellow-400";
  const styles = {
    primary: "px-4 py-3 md:px-6 md:py-4",
    small: "px-2 py-1 text-xs sm:px-3 sm:py-2",
    secondary:
      "bg-transparent hover:bg-transparent border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-4 focus:bg-transparent focus:border-yellow-300",
  };
  if (to)
    return (
      <Link to={to} className={`${base} ${styles[type]}`}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={`${base} ${styles[type]}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
