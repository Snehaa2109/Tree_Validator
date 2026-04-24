import React, { useState } from "react";

function InputBox({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    const array = input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onSubmit(array);
  };

  return (
    <div className="input-box">
      <textarea
        placeholder='Enter data like: A->B, B->C, C->D'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default InputBox;