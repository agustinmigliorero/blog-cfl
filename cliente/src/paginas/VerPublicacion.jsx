import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function VerPublicacion() {
  const [publicacion, setPublicacion] = useState({ usuario: {} });
  const { id } = useParams();

  const fetchPublicacion = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/publicaciones/${id}`
    );
    const data = await respuesta.json();
    setPublicacion(data);
  };

  useEffect(() => {
    fetchPublicacion();
  }, []);

  const itemsComentarios = () => {
    if (publicacion.comentarios) {
      return publicacion.comentarios.map((comentario) => {
        return (
          <li
            key={comentario._id}
            style={{ listStyle: "none", border: "2px solid black" }}
          >
            <h4>{comentario.usuario.nombre}</h4>
            {comentario.texto}
          </li>
        );
      });
    }
  };
  return (
    <>
      <h1>Publicacion:</h1>
      <h2>Titulo: {publicacion.titulo}</h2>
      <h2>Texto: {publicacion.texto}</h2>
      <h2>ID: {publicacion._id}</h2>
      <h2>Nombre usuario: {publicacion.usuario.nombre}</h2>
      <ul>{itemsComentarios()}</ul>
    </>
  );
}

export default VerPublicacion;
