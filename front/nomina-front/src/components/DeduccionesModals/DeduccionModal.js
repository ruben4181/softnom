import React from "react";
import DeduccionesApi from "../../api/DeduccionesApi";

const DeduccionModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [valor_total, setValorTotal] = React.useState(0);
  const [fecha, setFecha] = React.useState("");

  React.useEffect(() => {
    let deduccion = props.deduccion;
    let date = new Date(deduccion.fecha);
    const formattedDate = date.toISOString().split("T")[0];
    setCedula(deduccion.cedula);
    setNombre(deduccion.nombre);
    setTipo(deduccion.tipo);
    setDescripcion(deduccion.descripcion);
    setValorTotal(deduccion.valor_total);
    setFecha(formattedDate);
  }, []);

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Deduccion</h4>
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
                disabled={true}
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
                value={tipo}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTipo(e.target.value);
                }}
              >
                <option selected>{tipo}</option>
                <option value="CREDITO">CREDITO</option>
                <option value="PERMISOS">PERMISOS</option>
                <option value="INCAPACIDAD">INCAPACIDAD</option>
              </select>
              <label>Tipo</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Valor Total"
                value={valor_total}
                disabled={true}
                onChange={(e) => {
                  setValorTotal(e.target.value);
                }}
              />
              <label>Valor Total</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="date"
                className="form-control"
                placeholder="Fecha"
                disabled={true}
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

export default DeduccionModal;
