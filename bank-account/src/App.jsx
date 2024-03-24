/** @format */

import "./App.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  accountIsOpen: false,
  activeLoan: 0,
};

function reducer(currentState, action) {
  switch (action.type) {
    case "openAccount":
      return { ...currentState, accountIsOpen: true, balance: 500 };
    case "deposit":
      return { ...currentState, balance: currentState.balance + 150 };
    case "withdraw":
      return { ...currentState, balance: currentState.balance - 50 };
    case "requestLoan":
      if (currentState.activeLoan === 1) return { ...currentState };
      return { ...currentState, loan: currentState.loan + 5000, activeLoan: 1 };
    case "payLoan":
      return {
        ...currentState,
        loan: 0,
        balance: currentState.balance - currentState.loan,
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
          onClick={() => dispatch({ type: "deposit" })}
          disabled={!accountIsOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={!accountIsOpen}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan" })}
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
