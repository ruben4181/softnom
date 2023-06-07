import React from "react";
import "../styles/common.css";
import UsuariosApi from "../api/UsuariosApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleLoginClicked = (e) => {
    UsuariosApi.authUser(email, password)
      .then((resp) => {
        if (resp.resultado === "OK") {
          Cookies.set("usuario", JSON.stringify(resp.usuario), { expires: 1 });
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="topbar bg-dark">
        <div className="container">
          <div className="d-flex flex-row w-100 bg-dark justify-content-between">
            <span className="brand-title">
              <h1>SoftNom</h1>
            </span>
            <div className="d-flex align-items-center">
              <span>Software para gestión de Nomina</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <img
              src={process.env.PUBLIC_URL + "/escudo.svg"}
              className="escudo"
              alt="Escudo SVG"
            />
            <p style={{ fontSize: "1.8rem" }}>
              Alcaldía Municipal
              <br />
              Piendamó, Cauca
            </p>
            <h6>NIT. 891.500.856-6</h6>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-5">
          <div className="d-flex h-100">
            <div className="d-flex flex-column align-items-center justify-content-center w-100">
              <div className="card mt-3" style={{ width: "95%" }}>
                <div className="card-body p-4">
                  <h4>¡Bienvenido de nuevo!</h4>
                  <span>Accede al sistema con tus credenciales</span>
                  <div className="d-flex flex-column h-100 mt-3 mb-3">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="emailAddress"
                        placeholder="Correo eléctronico"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <label>Correo eléctronico</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="emailAddress"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label>Contraseña</label>
                    </div>
                    <div className="d-flex flex-row w-100 mb-3 justify-content-end">
                      <div
                        className="btn btn-primary"
                        onClick={handleLoginClicked}
                      >
                        Iniciar sesión
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer d-flex justify-content-center align-items-center p-3 w-100 bg-dark">
        <span>SoftNom 2023 </span>
      </div>
    </div>
  );
}
export default Home;
