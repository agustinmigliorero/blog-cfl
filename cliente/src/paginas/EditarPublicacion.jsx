import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditarPublicacion() {
  const { id } = useParams();
  const [textoPublicacion, setTextoPublicacion] = useState("");
  const [tituloPublicacion, setTituloPublicacion] = useState("");

  const fetchPublicacion = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/publicaciones/${id}`
    );
    const data = await respuesta.json();
    setTextoPublicacion(data.texto);
    setTituloPublicacion(data.titulo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await fetch(
      `http://localhost:3000/api/publicaciones/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: tituloPublicacion,
          texto: textoPublicacion,
        }),
      }
    );
    const data = await respuesta.json();
    console.log(data);
  };

  useEffect(() => {
    fetchPublicacion();
  }, []);

  return (
    <>
      <h1>Editar Publiacion!</h1>

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <input
          type="text"
          placeholder="Titulo"
          name="titulo"
          onChange={(e) => setTituloPublicacion(e.target.value)}
          value={tituloPublicacion}
        />
        <textarea
          type="text"
          placeholder="Texto"
          name="texto"
          onChange={(e) => setTextoPublicacion(e.target.value)}
          value={textoPublicacion}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default EditarPublicacion;
