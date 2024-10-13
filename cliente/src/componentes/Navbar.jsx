import Logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

function Navbar({ usuarioLogeado, setUsuarioLogeado }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "rgb(65, 95, 180)", fontSize: "18px" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand mt-2" href="#">
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "48px" }}
            className="mt-0 me-2"
          />
          <span
            className="ms-3"
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "22px",
              fontFamily: "Helvetica",
            }}
          >
            CFL 401
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/publicaciones"}>
                Publicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/usuarios"}>
                Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
