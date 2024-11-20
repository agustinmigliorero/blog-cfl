import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import VerUsuarios from "./paginas/VerUsuarios";
import VerPublicaciones from "./paginas/VerPublicaciones";
import VerPublicacion from "./paginas/VerPublicacion";
import CrearPublicacion from "./paginas/CrearPublicacion";
import EditarPublicacion from "./paginas/EditarPublicacion";
import IniciarSesion from "./paginas/IniciarSesion";
import Navbar from "./componentes/Navbar";
import VerUsuario from "./paginas/VerUsuario";
import CardNuevo from "./componentes/CardNuevo";
import { Toaster } from "react-hot-toast";

function RutaProtegidaUsuarioLogeado({ children }) {
  const { usuarioLogeado, cargando } = useAuth();
  if (cargando) {
    return <h1>Cargando...</h1>;
  } else if (!usuarioLogeado.logeado) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

function App() {
  const { usuarioLogeado, setUsuarioLogeado } = useAuth();

  return (
    <>
      <Navbar
        usuarioLogeado={usuarioLogeado}
        setUsuarioLogeado={setUsuarioLogeado}
      ></Navbar>

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

        <Route path="/usuarios/:id" element={<VerUsuario></VerUsuario>}></Route>

        <Route
          path="/publicaciones"
          element={
            <RutaProtegidaUsuarioLogeado>
              <VerPublicaciones></VerPublicaciones>
            </RutaProtegidaUsuarioLogeado>
          }
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
          path="/publicaciones/editar/:id"
          element={<EditarPublicacion />}
        ></Route>
        <Route
          path="/publicaciones/:id"
          element={
            <VerPublicacion usuarioLogeado={usuarioLogeado}></VerPublicacion>
          }
        ></Route>
      </Routes>

      <Toaster></Toaster>
    </>
  );
}

export default App;
