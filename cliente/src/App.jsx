import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Boton from "./componentes/Boton";
import { useState, useEffect } from "react";
import VerUsuarios from "./paginas/VerUsuarios";

function App() {
  return (
    <div>
      <VerUsuarios />
      <h1>Otra tabla</h1>
      <VerUsuarios />
      {/* <Boton texto="Clickeame" />
      <Boton texto="Volver atras" /> */}
    </div>
  );
}

export default App;
