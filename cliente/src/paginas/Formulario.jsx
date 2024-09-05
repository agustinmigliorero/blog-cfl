import { useState, useEffect } from "react";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function manejarFormulario(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        password: password,
        email: email,
      }),
    });
  }

  return (
    <>
      <form onSubmit={manejarFormulario}>
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Clave"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Formulario;
