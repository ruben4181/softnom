import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import "../styles/common.css";
import NominasApi from "../api/NominasApi";
import UsuariosApi from "../api/UsuariosApi";
import html2pdf from "html2pdf.js";

const Desprendible = (props) => {
  const [cedula, setCedula] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [itemsFiltered, setItemsFiltered] = React.useState([]);
  const [nombre, setNombre] = React.useState(null);
  const [cargo, setCargo] = React.useState(null);
  const [area, setArea] = React.useState(null);
  const [periodo, setPeriodo] = React.useState("2023-06-30");
  const [total, setTotal] = React.useState(0);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  const genDesprendibleClicked = () => {
    NominasApi.genDesprendible(cedula)
      .then((resp) => {
        if (resp.data.length > 0) {
          let row = resp.data[0];
          UsuariosApi.getUser(row.usuario_id)
            .then((resp) => {
              let user = resp.data;
              if (user) {
                setNombre(user.name);
                setCargo(user.cargo);
                setArea(user.area);
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err.message);
            });
        }
        setTotal(calcTotal(resp.data));
        setItems(resp.data);
        setItemsFiltered([...resp.data]);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const calcTotal = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      let it = items[i];
      console.log(it);
      total += it["total"];
    }
    return total;
  };

  const formatPrice = (number) => {
    const formattedNumber = number.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
    return formattedNumber;
  };

  const renderDeduccionesTable = () => {
    const items = [];
    for (let i = 0; i < itemsFiltered.length; i++) {
      let r = itemsFiltered[i];
      items.push(
        <tr key={i + "-item"}>
          <td className="td-middle">{r["concepto"]}</td>
          <td className="td-middle">{r["CANTIDAD"]}</td>
          <td className="td-middle">{r["descripcion"]}</td>
          <td className="td-middle">{formatPrice(r["devengo"])}</td>
          <td className="td-middle">{formatPrice(r["deducido"])}</td>
          <td className="td-middle">{formatPrice(r["total"])}</td>
        </tr>
      );
    }

    return items;
  };

  const exportToPDF = () => {
    const element = document.getElementById("toExport"); // Replace 'divToExport' with the id of your <div> element

    html2pdf()
      .set({ html2canvas: { scale: 4 } }) // Optional: Adjust the scale factor for better quality
      .from(element)
      .save();
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
                    className="btn btn-secondary me-3"
                    onClick={(e) => {
                      exportToPDF();
                    }}
                  >
                    Imprimir
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      genDesprendibleClicked();
                    }}
                  >
                    Generar desprendible
                  </button>
                </div>
                <div className="d-flex h-100 justify-content-center">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar funcionario"
                      value={cedula}
                      onChange={(e) => {
                        setCedula(e.target.value);
                      }}
                    />
                    <label>Cedula funcionario</label>
                  </div>
                </div>
              </div>
            </div>
            <div id="toExport">
              <div className="col-12">
                <div className="card mb-3 p-3" style={{ width: "100%" }}>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <b>Nombre: </b>
                      <span>{nombre}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <b>Área: </b>
                      <span>{area}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <b>Cargo: </b>
                      <span>{cargo}</span>
                    </div>
                    <div className="col-12 col-md-6">
                      <b>Periodo: </b>
                      <span>{periodo}</span>
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
                          <th scope="col">Concepto</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Descripcion</th>
                          <th scope="col">Devengo</th>
                          <th scope="col">Deducido</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>{renderDeduccionesTable()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card py-3" style={{ width: "100%" }}>
                  <div className="flex text-end pe-3">
                    <span className="font-weight-bold">Total:</span>{" "}
                    {formatPrice(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desprendible;
