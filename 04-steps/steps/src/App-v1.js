import React, { useState } from "react";
import DateCounter from "./components/DateCounter";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step === 1) return;
    setStep((currentStepValue) => currentStepValue - 1);
  }

  function handleNext() {
    if (step === 3) return;
    setStep((currentStepValue) => currentStepValue + 1);
  }
  return (
    <>
      <DateCounter />
      <button
        className="close"
        onClick={() => setIsOpen((currentIsOpenValue) => !currentIsOpenValue)}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">{messages[step - 1]}</p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
