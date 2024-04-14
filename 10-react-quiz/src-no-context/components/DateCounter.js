/** @format */

import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(currentState, action) {
  console.log(currentState, action);
  const { type, payload } = action;

  switch (type) {
    case "DECREMENT":
      return {
        ...currentState,
        count: currentState.count - currentState.step,
      };
    case "INCREMENT":
      return {
        ...currentState,
        count: currentState.count + currentState.step,
      };
    case "SET_COUNT":
      return {
        ...currentState,
        count: payload,
      };
    case "SET_STEP":
      return {
        ...currentState,
        step: payload,
      };

    case "RESET":
      return initialState;

    default:
      throw new Error("Unknown action.");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object. - this is derived state
  const date = new Date();
  date.setDate(date.getDate() + count);

  // const dec = function () {
  //   // setCount((count) => count - 1);
  //   // setCount((count) => count - step);
  //   dispatch({ type: "DECREMENT" });
  // };

  // const inc = function () {
  //   // setCount((count) => count + 1);
  //   // setCount((count) => count + step);
  //   dispatch({ type: "INCREMENT" });
  // };

  // const defineCount = function (e) {
  //   // setCount(Number(e.target.value));
  //   dispatch({ type: "SET_COUNT", payload: Number(e.target.value) });
  // };

  // const defineStep = function (e) {
  //   // setStep(Number(e.target.value));
  //   dispatch({ type: "SET_STEP", payload: Number(e.target.value) });
  // };

  // const reset = function () {
  //   dispatch({ type: "RESET" });
  // };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={(e) => {
            dispatch({ type: "SET_STEP", payload: Number(e.target.value) });
          }}
        />
        <span>{step}</span>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "DECREMENT" });
          }}
        >
          -
        </button>
        <input
          value={count}
          onChange={(e) => {
            dispatch({ type: "SET_COUNT", payload: Number(e.target.value) });
          }}
        />
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
