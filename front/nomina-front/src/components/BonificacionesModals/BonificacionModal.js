import React from "react";
import DeduccionesApi from "../../api/DeduccionesApi";

const BonificacionModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [dias, setDias] = React.useState(0);
  const [valor_total, setValorTotal] = React.useState(0);

  React.useEffect(() => {
    let bonificacion = props.bonificacion;
    let date = new Date(bonificacion.fecha);
    const formattedDate = date.toISOString().split("T")[0];
    setCedula(bonificacion.cedula);
    setDias(bonificacion.dias);
    setValorTotal(bonificacion.valor_total);
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
                type="number"
                className="form-control"
                placeholder="Dias"
                value={dias}
                disabled={true}
                onChange={(e) => {
                  setDias(e.target.value);
                }}
              />
              <label>Dias</label>
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

export default BonificacionModal;
