import React from "react";
import BonificacionesApi from "../../api/BonificacionesApi";

const NewBonificacionModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [dias, setDias] = React.useState(0);
  const [valor_total, setValorTotal] = React.useState(0);

  const handleAgregarClicked = () => {
    let body = {
      cedula,
      fecha,
      dias,
      valor_total,
    };

    BonificacionesApi.addBonificacion(body)
      .then((resp) => {
        console.log(resp);
        alert(resp.message);
        if (resp.result === "OK") {
          props.onSucced(resp.data);
          props.onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Bonificacion</h4>
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
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Valor Total"
                value={valor_total}
                onChange={(e) => {
                  setValorTotal(e.target.value);
                }}
              />
              <label>Valor Total</label>
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

export default NewBonificacionModal;
