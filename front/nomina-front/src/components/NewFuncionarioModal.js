import React from "react";
import UsuariosApi from "../api/UsuariosApi";
//import UsuariosApi from "../api/UsuariosApi";

const NewFuncionarioModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [name, setName] = React.useState("");
  const [area, setArea] = React.useState("");
  const [cargo, setCargo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [sueldo_basico, setSueldoBasico] = React.useState("");
  const [condicion, setCondicion] = React.useState("");
  const [estado, setEstado] = React.useState("");

  const handleAgregarClicked = (e) => {
    let data = {
      cedula,
      name,
      area,
      cargo,
      email,
      phone,
      sueldo_basico,
      condicion,
      estado,
    };
    UsuariosApi.addUser(data)
      .then((resp) => {
        alert(resp.mensaje);
        props.onSucced(resp.usuario);
        props.onClose();
      })
      .catch((err) => {
        alert(
          "Ha ocurrido un error, por favot verifica que el número de cédula ó email no correspondan a otro usuario ya creado"
        );
        console.log(err);
      });
  };

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Nuevo funcionario</h4>
      </div>
      <div className="d-flex" style={{ maxWidth: "400px" }}>
        <div className="row">
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Cedula"
                value={cedula}
                onChange={(e) => {
                  setCedula(e.target.value);
                }}
              />
              <label>Cedula</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label>Nombre completo</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Área"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                }}
              />
              <label>Área</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre completo"
                value={cargo}
                onChange={(e) => {
                  setCargo(e.target.value);
                }}
              />
              <label>Cargo</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Correo eléctronico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>Correo eléctronico</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Celular"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <label>Celular</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="number"
                min={0}
                step={10000}
                className="form-control"
                placeholder="Sueldo básico"
                value={sueldo_basico}
                onChange={(e) => {
                  setSueldoBasico(e.target.value);
                }}
              />
              <label>Sueldo básico</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Condicion"
                value={condicion}
                onChange={(e) => {
                  setCondicion(e.target.value);
                }}
              />
              <label>Condicion</label>
            </div>
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                }}
              />
              <label>Estado</label>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end mb-3">
        <button
          className="btn btn-primary me-3 w-25"
          onClick={handleAgregarClicked}
        >
          Agregar
        </button>
        <button className="btn btn-secondary w-25" onClick={props.onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NewFuncionarioModal;
