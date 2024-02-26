function Button({ children, onReset }) {
  return (
    <>
      <button className="button-19" onClick={onReset}>
        {children}
      </button>
    </>
  );
}

export default Button;
