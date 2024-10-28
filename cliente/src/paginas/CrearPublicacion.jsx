import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearPublicacion({ usuarioLogeado }) {
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");

  const fetchCrearPublicacion = (e) => {
    e.preventDefault();
    if (!usuarioLogeado.logeado) {
      navigate("/");
    }
    fetch("http://localhost:3000/api/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texto,
        titulo,
        usuario: usuarioLogeado.usuario._id,
      }),
    })
      .then(function (res) {
        console.log(res);
        alert("Publicacion creada!");
        navigate("/publicaciones");
      })
      .catch((res) => {
        alert("Error al crear publicacion!");
      });
  };

  return (
    <>
      <h1>Crear publicacion!</h1>
      <form onSubmit={fetchCrearPublicacion}>
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={function (e) {
            setTitulo(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Texto"
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
          }}
        />
        <input type="submit" value="Crear publicacion!" />
      </form>
    </>
  );
}

export default CrearPublicacion;
