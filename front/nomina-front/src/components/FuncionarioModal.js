import React from "react";
import UsuariosApi from "../api/UsuariosApi";

const FuncionarioModal = (props) => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    UsuariosApi.getUser(props.usuario)
      .then((resp) => {
        setUser(resp);
      })
      .catch((err) => {
        setUser({});
        console.log(err);
      });
  }, [props.usuario]);

  return (
    <div className="d-flex flex-column p-4">
      <div className="mb-3">
        <h4>Funcionario</h4>
      </div>
      <div className="d-flex" style={{ maxWidth: "400px" }}>
        <div className="row">
          <div className="mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Cedula"
                value={user.cedula}
                disabled={true}
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
                value={user.name}
                disabled={true}
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
                value={user.area}
                disabled={true}
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
                value={user.cargo}
                disabled={true}
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
                value={user.email}
                disabled={true}
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
                value={user.phone}
                disabled={true}
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
                value={user.sueldo_basico}
                disabled={true}
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
                value={user.condicion}
                disabled={true}
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
                value={user.estado}
                disabled={true}
              />
              <label>Estado</label>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row mb-3">
        <button className="btn btn-primary w-100" onClick={props.onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FuncionarioModal;
