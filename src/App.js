import React, { useState } from "react";
import { cityName } from "./api/fetchCityname";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await cityName(query);
      console.log(data);
    }
  };

  return (
    <div className="mainContainer">
      <input
        type="text"
        className="From"
        placeholder="From"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
    </div>
  );
};

export default App;
