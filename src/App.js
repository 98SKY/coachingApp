import React, { useEffect } from "react";
import './App.css';
import Navigate from './Component/Route';

function App() {
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
        document.title = name;
    }
}, []);
  return (
    <div className="App">
      <Navigate/>
    </div>
  );
}

export default App;
