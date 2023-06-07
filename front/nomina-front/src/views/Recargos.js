import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const Recargos = (props) => {
  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <TopBar usuario={usuario} navigate={navigate} />
        <div className="container">
          <div className="row">
            <h1>Recargos</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recargos;
