import React from "react";
import SubsidiosApi from "../../api/SubsidiosApi";

const UpdateSubsidioModal = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [valor, setValor] = React.useState(0);

  React.useEffect(() => {
    let subsidio = props.subsidio;
    setCedula(subsidio.cedula);
    setNombre(subsidio.nombre);
    setTipo(subsidio.tipo);
    setValor(subsidio.valor);
  }, []);

  const handleUpdateClicked = () => {
    let body = {
      cedula,
      nombre,
      tipo,
      valor,
    };
    SubsidiosApi.updateSubsidio(props.subsidio.id, body)
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
        <h4>Subsido</h4>
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
                placeholder="Nombre"
                disabled={false}
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
              <label>Nombre subsidio</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <select
                class="form-select"
                aria-label="Seleccionando"
                onChange={(e) => {
                  setTipo(e.target.value);
                }}
              >
                <option selected>Selecciona el tipo</option>
                <option value="SUB. TRANSPORTE">SUB. TRANSPORTE</option>
                <option value="AUX. ALIMENTACION">AUX. ALIMENTACION</option>
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
                value={valor}
                disabled={false}
                onChange={(e) => {
                  setValor(e.target.value);
                }}
              />
              <label>Valor</label>
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex flex-row justify-content-end mb-3">
              <button
                className="btn btn-primary me-3 w-25"
                onClick={handleUpdateClicked}
              >
                Actualizar
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

export default UpdateSubsidioModal;
