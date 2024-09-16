import { useState, useEffect } from "react";

function App() {
  const [publicaciones, setPublicaciones] = useState([]);

  const fetchPublicaciones = async () => {
    const res = await fetch("http://localhost:3000/api/publicaciones");
    const data = await res.json();
    setPublicaciones(data);
    console.log(data);
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const mostrarFilas = () => {
    return publicaciones.map((publicacion, index) => (
      <tr key={index}>
        <td>{publicacion._id}</td>
        <td>{publicacion.usuario}</td>
        <td>{publicacion.titulo}</td>
        <td>{publicacion.texto}</td>
      </tr>
    ));
  };

  return (
    <>
      <h1>Publicaciones!</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Titulo</th>
            <th>Texto</th>
          </tr>
        </thead>
        <tbody>{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default App;
