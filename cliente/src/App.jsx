import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./useAuth";
import VerUsuarios from "./paginas/VerUsuarios";
import VerPublicaciones from "./paginas/VerPublicaciones";
import VerPublicacion from "./paginas/VerPublicacion";
import CrearPublicacion from "./paginas/CrearPublicacion";
import IniciarSesion from "./paginas/IniciarSesion";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IniciarSesion
              usuarioLogeado={usuarioLogeado}
              setUsuarioLogeado={setUsuarioLogeado}
            />
          }
        ></Route>
        <Route path="/usuarios" element={<VerUsuarios></VerUsuarios>}></Route>

        <Route
          path="/publicaciones"
          element={<VerPublicaciones></VerPublicaciones>}
        ></Route>
        <Route
          path="/publicaciones/crear"
          element={
            <CrearPublicacion
              usuarioLogeado={usuarioLogeado}
            ></CrearPublicacion>
          }
        ></Route>
        <Route
          path="/publicaciones/:id"
          element={<VerPublicacion></VerPublicacion>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
