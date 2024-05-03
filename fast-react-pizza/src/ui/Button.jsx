import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm inline-block rounded-full  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed disabled:hover:bg-yellow-400";
  const styles = {
    primary:
      "bg-yellow-400 hover:bg-yellow-300 px-4 py-3 md:px-6 md:py-4 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2",
    small:
      "bg-yellow-400 hover:bg-yellow-300 px-2 py-1 text-xs sm:px-3 sm:py-2 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2",
    secondary:
      "bg-stone-200 hover:bg-stone-800 hover:text-stone-50 border-2 px-4 py-2.5 md:px-6 md:py-4 focus:bg-stone-800 focus:outline-none focus:ring focus:ring-stone-800 focus:ring-offset-2 focus:text-stone-50",
    round:
      "bg-yellow-400 hover:bg-yellow-300 rounded-full px-2.5 py-1 md:px-3.5 md:py-2 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2",
  };
  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${styles[type]}`}
      >
        {children}
      </button>
    );

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
  onClick: PropTypes.func,
};

export default Button;
