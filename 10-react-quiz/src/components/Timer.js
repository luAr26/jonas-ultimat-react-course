/** @format */
import { useEffect } from "react";

function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

function Timer({ dispatch, secondsRemaining }) {
  const minutes = formatNumber(Math.floor(secondsRemaining / 60));
  const seconds = formatNumber(secondsRemaining % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return <div className='timer'>{`${minutes}:${seconds}`}</div>;
}
export default Timer;
