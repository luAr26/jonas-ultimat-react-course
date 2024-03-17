/** @format */
import "./App.css";
import { useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const {
    isLoading,
    position: { lat, lng },
    error,
    getPosition,
  } = useGeolocation();
  const [countClicks, setCountClicks] = useState(0);

  function handleClick() {
    setCountClicks((prevCount) => prevCount + 1);
    getPosition();
  }
  // 40.730610, -73.935242 - New York
  return (
    <div className='container'>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://www.openstreetmap.org/#map=8/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      <p>
        You requested position {countClicks}{" "}
        {countClicks === 1 ? "time" : "times"}.
      </p>
    </div>
  );
}

export default App;
