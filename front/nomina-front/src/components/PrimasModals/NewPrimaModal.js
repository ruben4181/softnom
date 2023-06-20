import React from "react";
import PrimasApi from "../../api/PrimasApi";

const NewPrimaModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [fecha_ingreso, setFechaIngreso] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [valor_total, setValorTotal] = React.useState(0);

  const handleAddClicked = () => {
    let body = {
      cedula,
      valor_total,
      fecha_ingreso,
      tipo,
    };
    PrimasApi.addPrima(body)
      .then((resp) => {
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
        <h4>Prima</h4>
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
                disabled={false}
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
                placeholder="Valor Total"
                value={valor_total}
                disabled={false}
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
                disabled={false}
                value={fecha_ingreso}
                onChange={(e) => {
                  setFechaIngreso(e.target.value);
                }}
              />
              <label>Fecha Ingreso</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Cedula"
                value={tipo}
                disabled={false}
                onChange={(e) => {
                  setTipo(e.target.value);
                }}
              />
              <label>Tipo</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-end mb-3">
              <button
                className="btn btn-primary me-3 w-25"
                onClick={handleAddClicked}
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

export default NewPrimaModal;
