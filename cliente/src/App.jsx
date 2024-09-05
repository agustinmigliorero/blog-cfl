import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Boton from "./componentes/Boton";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import VerUsuarios from "./paginas/VerUsuarios";
import Formulario from "./paginas/Formulario";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<VerUsuarios />} /> */}
        {/* <Route path="/ver-usuarios" element={<VerUsuarios />} /> */}
        <Route path="/formulario" element={<Formulario />} />
      </Routes>

      <Formulario />
    </>
  );
}

export default App;
