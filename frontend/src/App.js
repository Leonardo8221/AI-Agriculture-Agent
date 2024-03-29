import React, { useState } from "react";
import Result from "./components/Result";
import Home from "./components/Home";

import './App.css'

function App() {
  const [showResult, setShowResult] = useState(false);

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
