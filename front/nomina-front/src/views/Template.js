import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Modal from "react-modal";
import "../styles/common.css";
import NewRecargoModal from "../components/RecargosModals/NewRecargoModal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const Template = (props) => {
  const [search, setSearch] = React.useState("");
  const [showAddModal, setShowAddModal] = React.useState(false);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  const renderReacargosTable = () => {};

  const onCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <TopBar usuario={usuario} navigate={navigate} />
        <div className="container">
          <div className="row">
            <div className="col-12 mt-5 mb-5">
              <div className="d-flex flex-row w-100 justify-content-between align-items-center">
                <div className="d-flex h-100 align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      setShowAddModal(true);
                    }}
                  >
                    Agregar
                  </button>
                </div>
                <div className="d-flex h-100 justify-content-center">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar funcionario"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <label>Buscar recargo</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Codigo</th>
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre novedad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Detalles</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>{renderReacargosTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showAddModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <NewRecargoModal onClose={onCloseAddModal} />
        </Modal>
      </div>
    </div>
  );
};

export default Template;
