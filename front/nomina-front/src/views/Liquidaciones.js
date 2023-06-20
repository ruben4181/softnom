import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Modal from "react-modal";
import "../styles/common.css";
import SubsidioModal from "../components/SubsidiosModals/SubsidioModal";
import NewSubsidioModal from "../components/SubsidiosModals/NewSubsidioModal";
import UpdateSubsidioModal from "../components/SubsidiosModals/UpdateSubsidioModal";
import LiquidacionesApi from "../api/LiquidacionesApi";

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

const Liquidaciones = (props) => {
  const [search, setSearch] = React.useState("");
  const [showAddBonificacionModal, setShowAddBonificacionModal] =
    React.useState(false);
  const [items, setItems] = React.useState([]);
  const [itemsFiltered, setItemsFiltered] = React.useState([]);
  const [showItemModal, setShowItemModal] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [liquidacion, setSubsidio] = React.useState(null);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  React.useEffect(() => {
    LiquidacionesApi.getLiquidaciones()
      .then((resp) => {
        setItems(resp.data);
        setItemsFiltered([...resp.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (search.length > 3) {
      LiquidacionesApi.findLiquidaciones(search, search)
        .then((resp) => {
          setItemsFiltered(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setItemsFiltered([...items]);
    }
  }, [items, search]);

  const handleOnSucced = (item) => {
    const tmp = [...items];
    tmp.push(item);
    setItems(tmp);
    setItemsFiltered(tmp);
  };

  const handleOnUpdate = (item) => {
    console.log(item);
    setSubsidio(item);
    setShowUpdateModal(true);
  };

  const updateItem = (item) => {
    let items2 = [...items];
    let itemsFiltered2 = [...itemsFiltered];

    for (let i = 0; i < items.length; i++) {
      let r = items2[i];
      if (r.id === item.id) {
        items2[i] = item;
      }
    }

    for (let i = 0; i < itemsFiltered2.length; i++) {
      let r = itemsFiltered2[i];
      if (r.id === item.id) {
        items2[i] = item;
      }
    }

    setItems(items2);
    setItemsFiltered(itemsFiltered2);
  };

  const handleOnDeshabilitar = (item) => {
    item.activo = item.activo ? 0 : 1;
    LiquidacionesApi.updateLiquidacion(item.id, item)
      .then((resp) => {
        let liquidacion = resp.data;
        updateItem(liquidacion);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleOnView = (item) => {
    setSubsidio(item);
    setShowItemModal(true);
  };

  const renderDeduccionesTable = () => {
    const items = [];
    for (let i = 0; i < itemsFiltered.length; i++) {
      let r = itemsFiltered[i];
      items.push(
        <tr key={i + "-item"}>
          <td className="td-middle">{r["id"]}</td>
          <td className="td-middle">{r["cedula"]}</td>
          <td className="td-middle">{r["dependencia"]}</td>
          <td className="td-middle">{r["valor"]}</td>
          <td className="td-middle">
            <button
              className="btn btn-light"
              onClick={() => {
                handleOnView(r);
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
                  handleOnUpdate(r);
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

  const onCloseAddBonificacionModal = () => {
    setShowAddBonificacionModal(false);
  };

  const onClosePrimaModal = () => {
    setShowItemModal(false);
  };

  const onCloseUpdatePrimaModal = () => {
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
                      setShowAddBonificacionModal(true);
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
                    <label>Buscar liquidaciones</label>
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
                        <th scope="col">Dependencia</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Detalles</th>
                        <th scope="col">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>{renderDeduccionesTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showAddBonificacionModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <NewSubsidioModal
            onClose={onCloseAddBonificacionModal}
            onSucced={handleOnSucced}
          />
        </Modal>
        <Modal
          isOpen={showItemModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <SubsidioModal
            onClose={onClosePrimaModal}
            liquidacion={liquidacion}
          />
        </Modal>
        <Modal
          isOpen={showUpdateModal}
          style={customStyles}
          overlayClassName="overlay-modal"
        >
          <UpdateSubsidioModal
            onClose={onCloseUpdatePrimaModal}
            onSucced={updateItem}
            liquidacion={liquidacion}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Liquidaciones;
