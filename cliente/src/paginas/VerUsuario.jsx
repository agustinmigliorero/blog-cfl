import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../componentes/Card";

function SeccionPublicaciones({ publicaciones }) {
  if (!publicaciones) {
    return (
      <div>
        <h1 className="text-center mt-5">Cargando...</h1>
      </div>
    );
  }

  const mostrarPublicaciones = () => {
    return publicaciones.map((publicacion) => {
      return (
        <div key={publicacion._id} className="col-12 col-md-6 col-lg-4">
          <Card
            titulo={publicacion.titulo}
            texto={publicacion.texto}
            textoBoton="Ver mas"
            linkBoton={`/publicaciones/${publicacion._id}`}
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

function SeccionComentarios({ comentarios }) {
  if (!comentarios) {
    return (
      <div>
        <h1 className="text-center mt-5">Cargando...</h1>
      </div>
    );
  }

  const mostrarComentarios = () => {
    return comentarios.map((comentario) => {
      return (
        <div key={comentario._id} className="col-12">
          <Card
            titulo={`Publicacion: ${comentario.publicacion.titulo}`}
            texto={`${comentario.texto}`}
            textoBoton="Ver publicacion original"
            linkBoton={`/publicaciones/${comentario.publicacion._id}`}
            puntaje={comentario.puntuacion}
          ></Card>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center mt-3">Comentarios</h1>
        <div className="row m-auto mt-4 w-75">{mostrarComentarios()}</div>
      </div>
    </>
  );
}

function VerUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState();
  const [seccion, setSeccion] = useState("publicaciones");

  const fetchUsuario = async () => {
    const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
    const data = await response.json();
    setUsuario(data);
  };

  const mostrarSeccion = () => {
    if (seccion === "publicaciones") {
      return (
        <SeccionPublicaciones
          publicaciones={usuario.publicaciones}
        ></SeccionPublicaciones>
      );
    } else if (seccion === "comentarios") {
      return (
        <SeccionComentarios
          comentarios={usuario.comentarios}
        ></SeccionComentarios>
      );
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  if (!usuario) {
    return (
      <div>
        <h1 className="text-center mt-5">Cargando...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="w-75 m-auto mt-4">
        <img
          src={usuario.imagen}
          className="rounded-circle"
          alt="Foto de perfil"
        />
        <h1 className="d-inline ms-5">{usuario.nombre}</h1>
        <div className="mt-5">
          <ul className="nav">
            <li
              className={`nav-item ${
                seccion === "publicaciones"
                  ? "border-bottom border-primary"
                  : ""
              }`}
            >
              <b
                className="nav-link"
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  setSeccion("publicaciones");
                }}
              >
                Publicaciones
              </b>
            </li>
            <li
              className={`nav-item ${
                seccion === "comentarios" ? "border-bottom border-primary" : ""
              }`}
            >
              <b
                className="nav-link"
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  setSeccion("comentarios");
                }}
              >
                Comentarios
              </b>
            </li>
          </ul>
        </div>
        {mostrarSeccion()}
      </div>
    </>
  );
}

export default VerUsuario;
