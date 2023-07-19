import React from "react";
import Cookies from "js-cookie";

const TopBar = (props) => {
  const onSignOutClicked = () => {
    Cookies.remove("usuario");
    props.navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/main">
          SoftNom
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
        <div
          className="collapse navbar-collapse pt-2 pb-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/main"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                General
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/gestion-funcionarios">
                    Gestionar funcionarios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item dropdown-toggle" href="#">
                    Generar nómina
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a className="dropdown-item" href="/recargos">
                        Recargos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/novedades">
                        Novedades
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/deducciones">
                        Deducciones
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/nomina">
                        Crear nómina
                      </a>
                    </li>
                  </ul>
                </li>
                <li>{/*<hr className="dropdown-divider" />*/}</li>
                <li>
                  <a className="dropdown-item" href="/desprendible">
                    Generar desprendible
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/main"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Servicios
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/bonificaciones">
                    Bonificación por servicio
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/primas">
                    Primas
                  </a>
                </li>
                <li>{/*<hr className="dropdown-divider" />*/}</li>
                <li>
                  <a className="dropdown-item" href="/subsidios">
                    Subsidios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/liquidaciones">
                    Liquidaciones
                  </a>
                </li>
                {/*
                <li>
                  <a className="dropdown-item" href="/main">
                    Cesantias
                  </a>
                </li>
                */}
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="/gestion-funcionarios"
              >
                Cuentas de usuario
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <div className="d-flex flex-row justify-content-center align-items-center">
                <i
                  className="fa-solid fa-user me-2"
                  style={{ color: "white" }}
                ></i>
                <a className="nav-link" aria-current="page" href="/main">
                  {props.usuario && props.usuario.name} | Admin
                </a>
              </div>
            </li>
            <button className="btn btn-primary" onClick={onSignOutClicked}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                Cerrar sesión
                <i
                  className="ms-2 fa-solid fa-right-from-bracket"
                  style={{ color: "white" }}
                ></i>
              </div>
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
