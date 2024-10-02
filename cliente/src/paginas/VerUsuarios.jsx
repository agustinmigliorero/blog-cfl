import { useState, useEffect } from "react";
import "../App.css";

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const response = await fetch("http://192.168.2.144:3000/api/usuarios");
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const mostrarFilas = () => {
    return usuarios.map((usuario) => {
      return (
        <tr key={usuario._id}>
          <td>{usuario._id}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
          <td>
            <img
              style={{ borderRadius: "50%", width: "32px" }}
              src={usuario.imagen}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default VerUsuarios;
