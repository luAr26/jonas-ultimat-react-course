import React, { useState } from "react";

const DateCounter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function decreaseStep() {
    if (step === 1) return;
    setStep((currentStep) => currentStep - 1);
  }

  function increaseStep() {
    setStep((currentStep) => currentStep + 1);
  }

  function decreaseCount() {
    setCount((currentCount) => currentCount - step);
  }

  function increaseCount() {
    setCount((currentCount) => currentCount + step);
  }

  let jsx;

  if (count === 0) {
    jsx = <p>Today is {date.toLocaleDateString()}.</p>;
  } else if (count < 0) {
    if (count === -1) {
      jsx = <p>1 day ago was {date.toLocaleDateString()}</p>;
    } else {
      jsx = (
        <p>
          {count * -1} days ago was {date.toLocaleDateString()}
        </p>
      );
    }
  } else {
    if (count === 1) {
      jsx = <p>1 day from today is {date.toLocaleDateString()}</p>;
    } else {
      jsx = (
        <p>
          {count} days from today is {date.toLocaleDateString()}
        </p>
      );
    }
  }

  return (
    <div>
      <p>
        <button onClick={decreaseStep}>-</button>
        <span>Step {step}</span>
        <button onClick={increaseStep}>+</button>
      </p>
      <p>
        <button onClick={decreaseCount}>-</button>
        <span>Count {count}</span>
        <button onClick={increaseCount}>+</button>
      </p>
      {jsx}
    </div>
  );
};

export default DateCounter;
