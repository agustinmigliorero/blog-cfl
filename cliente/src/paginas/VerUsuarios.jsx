import { useState, useEffect } from "react";

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const response = await fetch("http://localhost:3000/api/usuarios");
    const data = await response.json();

    setUsuarios(data);
  };

  const mostrarFilas = () => {
    let filas = usuarios.map((usuario) => {
      return (
        <tr>
          <td>{usuario._id}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.password}</td>
          <td>{usuario.email}</td>
        </tr>
      );
    });
    return filas;
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Password</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{mostrarFilas()}</tbody>
    </table>
  );
}

export default VerUsuarios;
