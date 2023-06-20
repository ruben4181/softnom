import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Modal from "react-modal";
import "../styles/common.css";
import NewNovedadModal from "../components/NovedadesModals/NewNovedadModal";
import NovedadModal from "../components/NovedadesModals/NovedadModal";
import NovedadesApi from "../api/NovedadesApi";
import UpdateNovedadModal from "../components/NovedadesModals/UpdateNovedadModal";

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

const Novedades = (props) => {
  const [search, setSearch] = React.useState("");
  const [showAddNovedadModal, setShowAddNovedadModal] = React.useState(false);
  const [showNovedadModal, setShowNovedadModal] = React.useState(false);
  const [showUpdateNovedadModal, setShowUpdateNovedadModal] =
    React.useState(false);
  const [viewingId, setViewingId] = React.useState(null);
  const [updatingId, setUpdatingId] = React.useState(null);
  const [novedades, setNovedades] = React.useState([]);
  const [novedadesFiltered, setNovedadesFiltered] = React.useState([]);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  const onCloseAddNovedadModal = () => {
    setShowAddNovedadModal(false);
  };

  const onCloseUpdateNovedadModal = () => {
    setShowUpdateNovedadModal(false);
  };

  const onCloseNovedadModal = () => {
    setShowNovedadModal(false);
  };

  const onAddSucced = (item) => {
    const items = [...novedades];
    const itemsFiltered = [...novedadesFiltered];
    items.push(item);
    itemsFiltered.push(item);

    setNovedades(items);
    setNovedadesFiltered(items);
  };

  const onUpdateNovedad = (novedad) => {
    let items = [...novedades];
    let itemsFiltered = [...novedadesFiltered];

    for (let i = 0; i < items.length; i++) {
      let r = items[i];
      if (r.id === novedad.id) {
        items[i] = novedad;
      }
    }

    for (let i = 0; i < itemsFiltered.length; i++) {
      let r = itemsFiltered[i];
      if (r.id === novedad.id) {
        items[i] = novedad;
      }
    }

    setNovedades(items);
    setNovedadesFiltered(items);
  };

  React.useEffect(() => {
    NovedadesApi.getNovedades()
      .then((resp) => {
        console.log(resp.data);
        setNovedades(resp.data);
        setNovedadesFiltered([...resp.data]);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  React.useEffect(() => {
    if (search.length > 3) {
      NovedadesApi.findNovedades(search, search, search, search)
        .then((resp) => {
          setNovedadesFiltered(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setNovedadesFiltered([...novedades]);
    }
  }, [search]);

  const handleOnView = (id) => {
    setViewingId(id);
    setShowNovedadModal(true);
  };

  const handleOnUpdate = (id) => {
    setUpdatingId(id);
    setShowUpdateNovedadModal(true);
  };

  const handleOnDeshabilitar = (novedad) => {
    novedad.activo = novedad.activo === 1 ? 0 : 1;
    NovedadesApi.updateNovedad(novedad.id, novedad)
      .then((resp) => {
        onUpdateNovedad(novedad);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderNovedadesTable = () => {
    const items = [];
    for (let i = 0; i < novedadesFiltered.length; i++) {
      let n = novedades[i];
      items.push(
        <tr key={i + "-novedad"}>
          <td className="td-middle">{n["id"]}</td>
          <td className="td-middle">{n["cedula"]}</td>
          <td className="td-middle">{n["nombre"]}</td>
          <td className="td-middle">{n["tipo"]}</td>
          <td className="td-middle">{n["fecha"]}</td>
          <td className="td-middle">
            <button
              className="btn btn-light"
              onClick={() => {
                handleOnView(n["id"]);
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
                  handleOnUpdate(n["id"]);
                }}
              >
                Actualizar
              </button>
              <button
                className="btn btn-light"
                onClick={() => {
                  handleOnDeshabilitar(n);
                }}
              >
                {n["activo"] ? "Deshabilitar" : "Habilitar"}
              </button>
            </div>
          </td>
        </tr>
      );
    }

    return items;
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
                      setShowAddNovedadModal(true);
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
                    <label>Buscar novedad</label>
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
                    <tbody>{renderNovedadesTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showAddNovedadModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <NewNovedadModal
            onClose={onCloseAddNovedadModal}
            onSucced={onAddSucced}
          />
        </Modal>
        <Modal
          isOpen={showNovedadModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <NovedadModal onClose={onCloseNovedadModal} id={viewingId} />
        </Modal>
        <Modal
          isOpen={showUpdateNovedadModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <UpdateNovedadModal
            onClose={onCloseUpdateNovedadModal}
            onSucced={onUpdateNovedad}
            id={updatingId}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Novedades;
