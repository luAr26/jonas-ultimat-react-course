/** @format */

import { capitalize } from "../utils";

const InputContainer = ({ children, label }) => {
  // capitalize first letter in a string
  const labelText = capitalize(label);
  console.log(labelText);

  return (
    <div className='input-container'>
      <label htmlFor={label}>{labelText}</label>
      {children}
    </div>
  );
};
export default InputContainer;
