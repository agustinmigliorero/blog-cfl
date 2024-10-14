import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const response = await fetch("http://localhost:3000/api/usuarios");
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
          <td className="border border-dark">{usuario._id}</td>
          <td className="border border-dark">{usuario.nombre}</td>
          <td className="border border-dark">{usuario.email}</td>
          <td className="border border-dark">
            <img
              style={{ borderRadius: "50%", width: "32px" }}
              src={usuario.imagen}
            />
          </td>
          <td className="border border-dark">
            <Link className="btn btn-primary" to={`/usuarios/${usuario._id}`}>
              Ver mas
            </Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1 className="text-center mt-4">Usuarios</h1>
      <table className="table table-hover w-75 text-center mt-5 m-auto border border-dark">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default VerUsuarios;
