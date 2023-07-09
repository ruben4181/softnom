import React from "react";
import NovedadesApi from "../../api/NovedadesApi";

const NovedadModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [dias, setDias] = React.useState(0);

  React.useState(() => {
    NovedadesApi.getNovedad(props.id)
      .then((resp) => {
        let data = resp.data;
        let fecha = new Date(data.fecha);
        const formattedDate = fecha.toISOString().split("T")[0];
        setCedula(data.cedula);
        setNombre(data.nombre);
        setTipo(data.tipo);
        setDescripcion(data.descripcion);
        setFecha(formattedDate);
        setDias(data.dias);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
                onSelect={(e) => {
                  setTipo(e.target.value);
                }}
              >
                <option selected>{tipo}</option>
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
                disabled={true}
                onChange={(e) => {
                  setFecha(e.target.value);
                }}
              />
              <label>Fecha</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                placeholder="Dias"
                value={dias}
                onChange={(e) => {
                  setDias(e.target.value);
                }}
              />
              <label>Dias</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-end mb-3">
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

export default NovedadModal;
