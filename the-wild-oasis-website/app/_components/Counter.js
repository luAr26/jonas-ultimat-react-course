/** @format */
"use client";
import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      <p>There are {users.length} users.</p>
    </div>
  );
}

export default Counter;
