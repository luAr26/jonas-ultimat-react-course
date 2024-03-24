/** @format */

import "./App.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  accountIsOpen: false,
  activeLoan: false,
};

function reducer(currentState, action) {
  if (!currentState.accountIsOpen && action.type !== "openAccount")
    return currentState;
  switch (action.type) {
    case "openAccount":
      return { ...currentState, accountIsOpen: true, balance: 500 };
    case "deposit":
      return {
        ...currentState,
        balance: currentState.balance + action.payload,
      };
    case "withdraw":
      return {
        ...currentState,
        balance: currentState.balance - action.payload,
      };
    case "requestLoan":
      if (currentState.activeLoan) return { ...currentState };
      return {
        ...currentState,
        loan: currentState.loan + action.payload,
        balance: currentState.balance + action.payload,
        activeLoan: true,
      };
    case "payLoan":
      return {
        ...currentState,
        loan: 0,
        balance: currentState.balance - currentState.loan,
        activeLoan: false,
      };

    case "closeAccount":
      if (currentState.balance > 0 || currentState.loan > 0)
        return { ...currentState };
      return { ...initialState };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, loan, accountIsOpen } = state;
  return (
    <div className='container'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={accountIsOpen}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!accountIsOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!accountIsOpen || balance < 50}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!accountIsOpen}
        >
          Request loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!accountIsOpen || balance < loan || loan === 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!accountIsOpen}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
