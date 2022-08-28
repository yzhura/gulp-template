import React, { useState } from 'react';

export const TestComponent = () => {
    const [count, setCount] = useState(0);

    return (
      <>
        <h1>{count}</h1>
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </>
    );
}

export default TestComponent;