import React, { useState } from "react";
import InputBox from "./components/InputBox";
import ResultDisplay from "./components/ResultDisplay";

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (dataArray) => {
    try {
      setError("");

      const res = await fetch("http://localhost:5000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: dataArray })
      });

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setResponse(data);

    } catch (err) {
      setError("Failed to fetch API. Check backend.");
      setResponse(null);
    }
  };

  return (
    <div className="container">
      <h1>Hierarchy Builder 🌳</h1>

      <InputBox onSubmit={handleSubmit} />

      {error && <p className="error">{error}</p>}

      {response && <ResultDisplay data={response} />}
    </div>
  );
}

export default App;