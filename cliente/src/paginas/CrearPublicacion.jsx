import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function CrearPublicacion({ usuarioLogeado }) {
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");

  const fetchCrearPublicacion = (e) => {
    e.preventDefault();
    const validacion = validarCampos({ texto, titulo });
    if (!validacion) {
      return;
    }
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
        toast.success("Publicacion creada con exito!");
        navigate("/publicaciones");
      })
      .catch((res) => {
        alert("Error al crear publicacion!");
      });
  };

  return (
    <>
      <div className="m-auto" style={{ width: "35%" }}>
        <h1 className="text-center">Crear publicacion!</h1>
        <form onSubmit={fetchCrearPublicacion}>
          <label className="mt-3 mb-2">Titulo</label>
          <input
            className="form-control"
            type="text"
            placeholder="Titulo"
            value={titulo}
            onChange={function (e) {
              setTitulo(e.target.value);
            }}
          />
          {/* <br /> */}
          <label className="mt-3 mb-2">Texto</label>
          <textarea
            type="text"
            placeholder="Texto"
            className="form-control"
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
          >
            {" "}
          </textarea>
          <input
            className="w-100 btn btn-primary mt-3"
            type="submit"
            value="Crear publicacion!"
          />
        </form>
      </div>
    </>
  );
}

function validarCampos({ texto, titulo }) {
  if (!texto || !titulo) {
    toast.error("No se pueden dejar campos vacios.", {
      duration: 2000,
      position: "top-center",
      icon: "🚨",
    });
    return false;
  }
  if (texto.length < 10) {
    toast.error("El texto debe tener al menos 10 caracteres.");
    return false;
  }
  if (titulo.length < 5) {
    toast.error("El titulo debe tener al menos 5 caracteres.");
    return false;
  }
  return true;
}

export default CrearPublicacion;
