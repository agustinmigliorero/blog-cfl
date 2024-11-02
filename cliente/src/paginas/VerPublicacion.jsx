import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "../componentes/Card";
import RatingEstrellas from "../componentes/RatingEstrellas";

function VerPublicacion({ usuarioLogeado }) {
  const [publicacion, setPublicacion] = useState({ usuario: {}, likes: [] });
  const [textoComentario, setTextoComentario] = useState("");
  const [puntuacionComentario, setPuntuacionComentario] = useState(5);
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

  const fetchEnviarComentario = () => {
    fetch("http://localhost:3000/api/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicacion: publicacion._id,
        texto: textoComentario,
        usuario: usuarioLogeado.usuario._id,
        puntuacion: puntuacionComentario,
      }),
    }).then((res) => {
      fetchPublicacion();
    });
  };

  const mostrarCajaComentario = () => {
    if (usuarioLogeado.logeado) {
      return (
        <div className="mt-3 w-50 m-auto">
          <textarea
            className="form-control"
            placeholder="Escribe un comentario"
            name="textoComentario"
            rows={5}
            onChange={(e) => setTextoComentario(e.target.value)}
            value={textoComentario}
          ></textarea>
          <RatingEstrellas
            estrellas={5}
            rating={puntuacionComentario}
            setRating={setPuntuacionComentario}
          />
          <button
            onClick={fetchEnviarComentario}
            className="btn btn-primary mt-2 ms-3"
          >
            Enviar Comentario
          </button>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <Link to={`/`} className="btn btn-primary">
            Inicia sesion para poder comentar
          </Link>
        </div>
      );
    }
  };

  const fetchDarMeGusta = () => {
    fetch(`http://localhost:3000/api/publicaciones/${publicacion._id}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      fetchPublicacion();
    });
  };

  const mostrarComentarios = () => {
    if (publicacion.comentarios) {
      return publicacion.comentarios.map((comentario) => {
        return (
          <div key={comentario._id} className="mb-3">
            <Card
              titulo={comentario.publicacion.titulo}
              texto={comentario.texto}
              autor={{
                nombre: comentario.usuario.nombre,
                id: comentario.usuario._id,
              }}
              puntaje={comentario.puntuacion}
            ></Card>
          </div>
        );
      });
    }
  };

  function calcularPromedioPuntaje() {
    if (publicacion.comentarios) {
      let suma = 0;
      let promedio = 0;
      for (let i = 0; i < publicacion.comentarios.length; i++) {
        suma += publicacion.comentarios[i].puntuacion;
      }
      promedio = suma / publicacion.comentarios.length;
      return isNaN(promedio / publicacion.comentarios.length)
        ? "No hay puntuaciones"
        : promedio.toFixed(2);
    }
  }

  return (
    <>
      <div className="container mt-3 w-75">
        <h1 className="text-center mt-3">{publicacion.titulo}</h1>
        <h5 className="ms-3 mt-3 mb-4">
          <i>Autor:</i>{" "}
          <Link to={`/usuarios/${publicacion.usuario._id}`}>
            <b>{publicacion.usuario.nombre}</b>
          </Link>
        </h5>
        <p style={{ fontSize: "17px" }}>{publicacion.texto}</p>
        {usuarioLogeado.logeado ? (
          <p>
            <button className="btn btn-primary" onClick={fetchDarMeGusta}>
              {" "}
              <i className="fas fa-thumbs-up"></i> Dar Me Gusta
            </button>{" "}
            <br />
            Cantidad de me gustas: {publicacion.likes.length}
          </p>
        ) : (
          <p>
            Cantidad de me gustas: {publicacion.likes.length} <br />
            <Link to={`/`} className="btn btn-primary">
              Inicia sesion para poder dar me gusta
            </Link>
          </p>
        )}
        <hr />
        <h4 className="mb-4 mt-5">
          Puntuacion promedio: {calcularPromedioPuntaje()} / 5{" "}
          <span className="text-warning">★</span>
        </h4>
        <hr />
        <div className="m-auto mt-4">
          <h2 className="text-center mb-4">Comentarios</h2>
          {mostrarCajaComentario()}
          <br />
          {mostrarComentarios()}
        </div>
      </div>
    </>
  );
}

export default VerPublicacion;
