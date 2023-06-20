import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Modal from "react-modal";
import "../styles/common.css";
import RecargosApi from "../api/RecargosApi";
import NewRecargoModal from "../components/RecargosModals/NewRecargoModal";
import RecargoModal from "../components/RecargosModals/RecargoModal";
import UpdateRecargoModal from "../components/RecargosModals/UpdateRecargoModal";

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

const Recargos = (props) => {
  const [search, setSearch] = React.useState("");
  const [showAddReacargoModal, setShowAddReacargoModal] = React.useState(false);
  const [recargos, setRecargos] = React.useState([]);
  const [recargosFiltered, setRecargosFiltered] = React.useState([]);
  const [showRecargoModal, setShowRecargoModal] = React.useState(false);
  const [viewingId, setViewingId] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  React.useEffect(() => {
    RecargosApi.getRecargos()
      .then((resp) => {
        setRecargos(resp.data);
        setRecargosFiltered([...resp.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (search.length > 3) {
      RecargosApi.findRecargos(null, search, search)
        .then((resp) => {
          setRecargosFiltered(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRecargosFiltered([...recargos]);
    }
  }, [recargos, search]);

  const handleOnSucced = (item) => {
    const items = [...recargos];
    items.push(item);
    setRecargos(items);
  };

  const handleOnUpdate = (id) => {
    setUpdatingId(id);
    setShowUpdateModal(true);
  };

  const updateRecargo = (recargo) => {
    let items = [...recargos];
    let itemsFiltered = [...recargosFiltered];

    for (let i = 0; i < items.length; i++) {
      let r = items[i];
      if (r.id === recargo.id) {
        items[i] = recargo;
      }
    }

    for (let i = 0; i < itemsFiltered.length; i++) {
      let r = itemsFiltered[i];
      if (r.id === recargo.id) {
        items[i] = recargo;
      }
    }

    setRecargos(items);
    setRecargosFiltered(items);
  };

  const handleOnDeshabilitar = (recargo) => {
    recargo.activo = recargo.activo ? 0 : 1;
    RecargosApi.updateRecargo(recargo.id, recargo)
      .then((resp) => {
        let recargo = resp.data;
        updateRecargo(recargo);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleOnView = (id) => {
    setViewingId(id);
    setShowRecargoModal(true);
  };

  const renderReacargosTable = () => {
    const items = [];
    for (let i = 0; i < recargosFiltered.length; i++) {
      let r = recargosFiltered[i];
      items.push(
        <tr key={i + "-recargo"}>
          <td className="td-middle">{r["id"]}</td>
          <td className="td-middle">{r["cedula"]}</td>
          <td className="td-middle">{r["horas"]}</td>
          <td className="td-middle">{r["valor_total"]}</td>
          <td className="td-middle">
            <button
              className="btn btn-light"
              onClick={() => {
                handleOnView(r["id"]);
              }}
            >
              Ver
            </button>
          </td>
          <td className="td-middle">
            <div className="d-flex flex-row">
              <button
                className="btn btn-light"
                onClick={() => {
                  handleOnUpdate(r["id"]);
                }}
              >
                Actualizar
              </button>
              <button
                className="btn btn-light"
                onClick={() => {
                  handleOnDeshabilitar(r);
                }}
              >
                {r["activo"] ? "Deshabilitar" : "Habilitar"}
              </button>
            </div>
          </td>
        </tr>
      );
    }

    return items;
  };

  const onCloseAddRecargoModal = () => {
    setShowAddReacargoModal(false);
  };

  const onCloseRecargoModal = () => {
    setShowRecargoModal(false);
  };

  const onCloseUpdateRecargoModal = () => {
    setShowUpdateModal(false);
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
                      setShowAddReacargoModal(true);
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
                        <th scope="col">Horas trabajadas</th>
                        <th scope="col">Valor total</th>
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
          isOpen={showAddReacargoModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <NewRecargoModal
            onClose={onCloseAddRecargoModal}
            onSucced={handleOnSucced}
          />
        </Modal>
        <Modal
          isOpen={showRecargoModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <RecargoModal onClose={onCloseRecargoModal} id={viewingId} />
        </Modal>
        <Modal
          isOpen={showUpdateModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <UpdateRecargoModal
            onClose={onCloseUpdateRecargoModal}
            onSucced={updateRecargo}
            id={updatingId}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Recargos;
