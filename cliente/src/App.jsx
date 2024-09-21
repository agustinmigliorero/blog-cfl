import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import VerUsuarios from "./paginas/VerUsuarios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <div>
      <h1>App</h1>

      <Routes>
        <Route path="/usuarios" element={<VerUsuarios />}></Route>
      </Routes>
    </div>
  );
}

export default App;
