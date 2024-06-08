/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import Result from "./components/Result";
import Home from "./components/Home";

import "./App.css";

function App(props) {
  const [showResult, setShowResult] = useState(false);
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    () => {
      console.log("hello");
      setCounter(1);
    };
  }, [props.visible]);

  return (
    <div className="flex max-w-7xl justify-center mx-auto">
      {!showResult ? (
        <Home setShowResult={setShowResult} />
      ) : (
        <Result setShowResult={setShowResult} />
      )}
    </div>
  );
}

export default App;
