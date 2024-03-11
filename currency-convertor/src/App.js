/** @format */

import { useState, useEffect } from "react";
import "./App.css";

import Loader from "./components/Loader";

const host = "api.frankfurter.app";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getConversionRates = async () => {
      if (fromCurrency === toCurrency) return setResult(amount);
      if (amount === "") return setResult(0);
      if (isNaN(Number(amount))) return setResult("Invalid amount.");

      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(
          `https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();
        setResult(data.rates[toCurrency]);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        setResult("Not found.");
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getConversionRates();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className='container'>
      <h1>Currency Convertor</h1>
      {error && <p className='error'>{error}</p>}
      <div className='form-control'>
        <label htmlFor='amount'>Amount</label>
        <input
          type='text'
          id='amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className='form-control'>
        <label htmlFor='from'>From</label>
        <select
          name='from'
          id='from'
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='CAD'>CAD</option>
          <option value='INR'>INR</option>
        </select>
      </div>
      <div className='form-control'>
        <label htmlFor='to'>To</label>
        <select
          name='to'
          id='to'
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='CAD'>CAD</option>
          <option value='INR'>INR</option>
        </select>
      </div>
      <p className='result'>
        Result: {isLoading ? <Loader /> : <span>{result}</span>}
      </p>
    </div>
  );
}

export default App;
