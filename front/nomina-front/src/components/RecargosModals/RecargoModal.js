import React from "react";
import RecargosApi from "../../api/RecargosApi";

const RecargoModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [horas, setHoras] = React.useState(0);
  const [valor_hora, setValorHora] = React.useState(0);
  const [valor_total, setValorTotal] = React.useState(0);
  const [descripcion, setDescripcion] = React.useState("");
  const [fecha, setFecha] = React.useState("");

  React.useEffect(() => {
    if (horas && horas.length > 0 && valor_hora && valor_hora.length > 0) {
      setValorTotal(horas * valor_hora);
    }
  }, [horas, valor_hora]);

  React.useEffect(() => {
    RecargosApi.getRecargo(props.id)
      .then((resp) => {
        let body = resp.data;
        let fecha = new Date(body.fecha);
        const formattedDate = fecha.toISOString().split("T")[0];
        if (resp.result === "OK") {
          setCedula(body.cedula);
          setHoras(body.horas);
          setValorHora(body.valor_hora);
          setValorTotal(body.valor_total);
          setDescripcion(body.descripcion);
          setFecha(formattedDate);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Recargo</h4>
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
                placeholder="Horas trabajadas"
                value={horas}
                disabled={true}
                onChange={(e) => {
                  setHoras(e.target.value);
                }}
              />
              <label>Horas trabajadas</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                placeholder="Valor hora"
                value={valor_hora}
                disabled={true}
                onChange={(e) => {
                  setValorHora(e.target.value);
                }}
              />
              <label>Valor hora</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                placeholder="Valor total"
                value={valor_total}
                disabled={true}
              />
              <label>Valor total</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Descripcion"
                value={descripcion}
                disabled={true}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
              <label>Descripcion</label>
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

export default RecargoModal;
