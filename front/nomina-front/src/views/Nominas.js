import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
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

const Nominas = () => {
  const [search, setSearch] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [itemsFiltered, setItemsFiltered] = React.useState([]);

  const navigate = useNavigate();
  const usuarioString = Cookies.get("usuario");
  var usuario = usuarioString ? JSON.parse(usuarioString) : null;

  //Funcion que se dispara al iniciar la vista
  React.useEffect(() => {
    NominasApi.getNominas()
      .then((resp) => {
        setItems(calcAmmounts(resp.data));
        setItemsFiltered([...calcAmmounts(resp.data)]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calcAmmounts = (items) => {
    const nominas = [];
    for (let i = 0; i < items.length; i++) {
      let it = items[i];
      it["ASIGN. DEVENGADO"] = (it["DIAS"] / 30) * it["SUELDO BASICO"];
      let totalDevengado =
        it["ASIGN. DEVENGADO"] +
        it["AUX. ALIMENTACION"] +
        it["SUB. TRANSPORTE"] +
        it["RECARGOS"];
      let totalDeducciones = it["E.P.S"] + it["A.F.P"] + it["OTROS"];
      let total = totalDevengado - totalDeducciones;
      nominas.push({
        CEDULA: it["CEDULA"],
        "NOMBRES Y APELLIDOS": it["NOMBRES Y APELLIDOS"],
        CARGO: it["CARGO"],
        "SUELDO BASICO": it["SUELDO BASICO"],
        DIAS: it["DIAS"],
        "ASIGN. DEVENGADO": it["ASIGN. DEVENGADO"],
        "SUB. TRANSPORTE": it["SUB. TRANSPORTE"],
        "AUX. ALIMENTACION": it["AUX. ALIMENTACION"],
        RECARGOS: it["RECARGOS"],
        "TOTAL DEVENGADO": totalDevengado,
        "E.P.S": it["E.P.S"],
        "A.F.P": it["A.F.P"],
        OTROS: it["OTROS"],
        "TOTAL DEDUCCIONES": totalDeducciones,
        TOTAL: total,
        FIRMA: "",
      });
    }

    return nominas;
  };

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
          <td className="td-middle">{r["CEDULA"]}</td>
          <td className="td-middle">{r["CARGO"]}</td>
          <td className="td-middle">{r["SUELDO BASICO"]}</td>
          <td className="td-middle">{r["DIAS"]}</td>
          <td className="td-middle">{formatPrice(r["TOTAL DEVENGADO"])}</td>
          <td className="td-middle">{formatPrice(r["TOTAL DEDUCCIONES"])}</td>
          <td className="td-middle">{formatPrice(r["TOTAL"])}</td>
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
                    Generar Excel
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
                        <th scope="col">Dias</th>
                        <th scope="col">Total Devengado</th>
                        <th scope="col">Total Deducciones</th>
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
