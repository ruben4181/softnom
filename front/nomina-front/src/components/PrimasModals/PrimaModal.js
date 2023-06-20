import React from "react";

const PrimaModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [fecha_ingreso, setFechaIngreso] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [valor_total, setValorTotal] = React.useState(0);

  React.useEffect(() => {
    let prima = props.prima;
    let date = new Date(prima.fecha_ingreso);
    const formattedDate = date.toISOString().split("T")[0];
    setCedula(prima.cedula);
    setValorTotal(prima.valor_total);
    setFechaIngreso(formattedDate);
    setTipo(prima.tipo);
  }, []);

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
                disabled={true}
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

export default PrimaModal;
