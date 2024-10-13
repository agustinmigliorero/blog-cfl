import { Link } from "react-router-dom";

function Card({ titulo, texto, textoBoton, linkBoton, puntaje = -1, autor }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-center">{titulo}</h4>
        <p className="card-text">{texto}</p>
        {autor && (
          <p className="card-text">
            <i>Autor: </i>
            <Link to={`/usuarios/${autor.id}`}>
              <b>{autor.nombre}</b>
            </Link>
          </p>
        )}
        {puntaje !== -1 && <p className="card-text">Puntaje: {puntaje}</p>}
        {textoBoton && (
          <Link
            to={linkBoton}
            className="btn btn-primary w-100 ms-2 me-2 m-auto mt-3"
          >
            {textoBoton}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;
