import React from "react";
import TopBar from "../components/TopBar";
import "../styles/common.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Main = (props) => {
  //Cargando el usuario y comprobando que tenga iniciada la sesión y acceso a la vista
  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  React.useEffect(() => {
    if (usuario === null) {
      alert("Inicia sesión nuevamente, por favor");
      navigate("/");
    }
  });
  //Fin de comprobaciones del inicio de sesión

  return (
    <div className="d-flex flex-column w-100 h-100 bg-light">
      <TopBar usuario={usuario} navigate={navigate} />
      <div className="container">
        <span>Body de la página</span>
      </div>
      <div className="footer">
        <span>SoftNom 2023</span>
      </div>
    </div>
  );
};

export default Main;
