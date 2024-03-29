import React from "react";

const Result = (props) => {
  return (
    <div>
      Result
      <button onClick={() => props.setShowResult(false)}>back</button>
    </div>
  );
};

export default Result;
