import React from "react";
import useState from "react";
import "./App.css";

function App() {
  const [value, setValue] = React.useState(0);

  const increaseValue = () => {
    setValue(value + 5);
  };
  const decreaseValue = () => {
    setValue(value - 5);
  };

  return (
    <>
      <div>
        <h1>Value: {value}</h1>
        <button onClick={increaseValue}>Correct</button>
        <button onClick={decreaseValue}>Incorrect</button>
      </div>
    </>
  );
}

export default App;
