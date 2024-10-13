import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../componentes/Card";

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  const fetchPublicaciones = async () => {
    const respuesta = await fetch("http://localhost:3000/api/publicaciones");
    const datos = await respuesta.json();
    setPublicaciones(datos);
    console.log(datos);
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const mostrarPublicaciones = () => {
    return publicaciones.map((publicacion) => {
      return (
        <div key={publicacion._id} className="col-12 col-md-6 col-lg-4">
          <Card
            titulo={publicacion.titulo}
            texto={publicacion.texto}
            textoBoton="Ver mas"
            linkBoton={`/publicaciones/${publicacion._id}`}
            autor={{
              nombre: publicacion.usuario.nombre,
              id: publicacion.usuario._id,
            }}
          ></Card>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mt-3">Publicaciones</h1>
        <div className="row m-auto mt-4">{mostrarPublicaciones()}</div>
      </div>
    </>
  );
}

export default VerPublicaciones;
