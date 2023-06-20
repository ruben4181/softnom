import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TopBar from "../components/TopBar";
import "../styles/common.css";
import UsuariosApi from "../api/UsuariosApi";
import FuncionarioModal from "../components/FuncModals/FuncionarioModal";
import NewFuncionarioModal from "../components/FuncModals/NewFuncionarioModal";
import UpdateFuncionarioModal from "../components//FuncModals/UpdateFuncionarioModal";
import Modal from "react-modal";

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

const GestionarFuncionarios = (props) => {
  //Cargar usuario desde las cookies
  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  React.useEffect(() => {
    if (usuario === null) {
      alert("Inicia sesión nuevamente, por favor");
      navigate("/");
    }
  });
  //Termina carga y validación de usuario desde cookies

  const [search, setSearch] = React.useState("");
  const [funcs, setFuncs] = React.useState([]);
  const [funcsFiltered, setFuncsFiltered] = React.useState([]);
  const [showFuncModal, setShowFuncModal] = React.useState(false);
  const [showNewFuncModal, setShowNewFuncModal] = React.useState(false);
  const [showUpdFuncModal, setShowUpdFuncModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [updatingUser, setUpdatingUser] = React.useState(null);

  const onCloseFuncModal = (e) => {
    setSelectedUser(null);
    setShowFuncModal(false);
  };

  const onCloseNewFuncModal = (e) => {
    setShowNewFuncModal(false);
  };

  const onCloseUpdFuncModal = (e) => {
    setShowUpdFuncModal(false);
    setUpdatingUser(null);
  };

  React.useEffect(() => {
    if (selectedUser !== null) {
      setShowFuncModal(true);
    }
  }, [selectedUser]);

  React.useEffect(() => {
    UsuariosApi.getUsers()
      .then((resp) => {
        let users = resp.data;
        setFuncs(users);
        setFuncsFiltered([...users]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onUpdFuncClicked = (usuario_id) => {
    setUpdatingUser(usuario_id);
  };

  React.useEffect(() => {
    if (updatingUser) {
      setShowUpdFuncModal(true);
    }
  }, [updatingUser]);

  const renderUserTable = () => {
    const items = [];

    for (let i = 0; i < funcsFiltered.length; i++) {
      let f = funcsFiltered[i];
      items.push(
        <tr key={i + "-user"}>
          <td className="td-middle">{f["cedula"]}</td>
          <td className="td-middle">{f["name"]}</td>
          <td className="td-middle">{f["phone"]}</td>
          <td className="td-middle">
            <button
              className="btn btn-light"
              onClick={() => {
                setSelectedUser(f["id"]);
              }}
            >
              Ver
            </button>
          </td>
          <td className="td-middle">
            {f["activo"] === 1 ? "Habilitado" : "Deshabilitado"}
          </td>
          <td>
            <div className="d-flex flex-row">
              <button
                className="btn btn-light me-3"
                onClick={(e) => {
                  onUpdFuncClicked(f["id"]);
                }}
              >
                Actualizar
              </button>
              <button
                className="btn btn-light"
                onClick={(e) => {
                  handleDeshabilitarClicked(f);
                }}
              >
                {f["activo"] === 1 ? "Deshabilitar" : "Habilitar"}
              </button>
            </div>
          </td>
        </tr>
      );
    }

    return items;
  };

  React.useEffect(() => {
    if (search.length > 3) {
      UsuariosApi.findUser(search, search, search)
        .then((resp) => {
          setFuncsFiltered(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFuncsFiltered([...funcs]);
    }
  }, [search, funcs]);

  const onUserAdded = (u) => {
    let items = [...funcs];
    items.push(u);
    setFuncs(funcs);
    setFuncsFiltered([...items]);
  };

  const onUserUpdated = (u) => {
    let items = [...funcs];

    for (let i = 0; i < items.length; i++) {
      let f = items[i];
      if (u.id && u.id === f.id) {
        items[i] = u;
      }
    }

    setFuncs(items);
    setFuncsFiltered([...items]);
  };

  const handleDeshabilitarClicked = (user) => {
    user["activo"] = user["activo"] === 1 ? 0 : 1;
    UsuariosApi.updateUser(user["id"], user)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    onUserUpdated(user);
  };

  return (
    <div
      className="container-fluid p-0 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <TopBar usuario={usuario} navigate={navigate} />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 mb-5">
            <div className="d-flex flex-row w-100 justify-content-between align-items-center">
              <div className="d-flex h-100 align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    setShowNewFuncModal(true);
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
                  <label>Buscar funcionario</label>
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
                      <th scope="col">Cedula</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Celular</th>
                      <th scope="col">Detalles</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>{renderUserTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showFuncModal}
        style={customStyles}
        overlayClassName="overlay-modal"
      >
        <FuncionarioModal usuario={selectedUser} onClose={onCloseFuncModal} />
      </Modal>
      <Modal
        isOpen={showNewFuncModal}
        style={customStyles}
        overlayClassName="overlay-modal"
      >
        <NewFuncionarioModal
          usuario={selectedUser}
          onClose={onCloseNewFuncModal}
          onSucced={onUserAdded}
        />
      </Modal>
      <Modal
        isOpen={showUpdFuncModal}
        style={customStyles}
        overlayClassName="overlay-modal"
      >
        <UpdateFuncionarioModal
          usuario={updatingUser}
          onClose={onCloseUpdFuncModal}
          onSucced={onUserUpdated}
        />
      </Modal>
    </div>
  );
};

export default GestionarFuncionarios;
