import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Modal from "react-modal";
import "../styles/common.css";
import NominasApi from "../api/NominasApi";
import * as XLSX from "xlsx";

const convertJSONtoExcel = (data) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  // Generate a buffer from the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a blob from the buffer
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.xlsx";
  link.click();

  // Clean up the URL object
  URL.revokeObjectURL(url);
};

const Nominas = (props) => {
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [itemsFiltered, setItemsFiltered] = React.useState([]);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  React.useEffect(() => {
    NominasApi.getNominas()
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
      let tmp = items.filter(
        (obj) =>
          obj.cedula.includes(search) ||
          obj.name.includes(search) ||
          obj.cargo.includes(search) ||
          obj.area.includes(search)
      );
      setItemsFiltered(tmp);
    } else {
      setItemsFiltered([...items]);
    }
  }, [items, search]);

  const confirmarPago = () => {
    NominasApi.confirmarPago()
      .then((resp) => {
        alert(resp.message);
        if (resp.result === "OK") {
          genExcel();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const genExcel = () => {
    convertJSONtoExcel(items);
    console.log("Generando excel");
  };

  const renderDeduccionesTable = () => {
    const items = [];
    for (let i = 0; i < itemsFiltered.length; i++) {
      let r = itemsFiltered[i];
      items.push(
        <tr key={i + "-item"}>
          <td className="td-middle">{r["cedula"]}</td>
          <td className="td-middle">{r["cargo"]}</td>
          <td className="td-middle">{r["sueldo_basico"]}</td>
          <td className="td-middle">{r["total_recargos"]}</td>
          <td className="td-middle">{r["total_deducciones"]}</td>
          <td className="td-middle">{r["total_pago"]}</td>
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
                    className="btn btn-secondary"
                    onClick={(e) => {
                      genExcel();
                    }}
                  >
                    Generar Expcel
                  </button>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={(e) => {
                      confirmarPago();
                    }}
                  >
                    Confirmar pago de nomina
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
                        <th scope="col">Cédula</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Sueldo Basico</th>
                        <th scope="col">Recargos</th>
                        <th scope="col">Deducciones</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>{renderDeduccionesTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nominas;
