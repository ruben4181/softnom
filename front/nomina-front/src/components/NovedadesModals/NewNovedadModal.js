import React from "react";
import NovedadesApi from "../../api/NovedadesApi";

const NewNovedadModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [fecha, setFecha] = React.useState("");

  const handleAgregarClicked = () => {
    let body = {
      nombre,
      tipo,
      descripcion,
      fecha,
      cedula,
    };

    NovedadesApi.addNovedad(body)
      .then((resp) => {
        alert(resp.message);
        if (resp.result === "OK") {
          props.onSucced(resp.data);
        }
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Novedad</h4>
      </div>
      <div className="d-flex" style={{ maxWidth: "400px" }}>
        <div className="row">
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="number"
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
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
              <label>Nombre novedad</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Descripcion"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
              <label>Descripcion</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <select
                class="form-select"
                aria-label="Seleccionando"
                onChange={(e) => {
                  console.log(e.target.value);
                  setTipo(e.target.value);
                }}
              >
                <option selected>Selecciona el tipo</option>
                <option value="PERMISOS">PERMISOS</option>
                <option value="VACACIONES">VACACIONES</option>
                <option value="INCAPACIDAD">INCAPACIDAD</option>
              </select>
              <label>Tipo</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                placeholder="Fecha"
                value={fecha}
                onChange={(e) => {
                  setFecha(e.target.value);
                }}
              />
              <label>Fecha</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-end mb-3">
              <button
                className="btn btn-primary me-3 w-25"
                onClick={handleAgregarClicked}
              >
                Agregar
              </button>
              <button
                className="btn btn-secondary w-25"
                onClick={props.onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNovedadModal;
