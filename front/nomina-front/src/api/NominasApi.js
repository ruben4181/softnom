import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "34.125.8.183";
const BASE_URL = "http://" + HOST + ":8000";

const getNominas = (activo) => {
  return new Promise((resolve, reject) => {
    let concat = "";
    if (activo) {
      concat = "?activo=1";
    }
    let config = {
      url: BASE_URL + "/api/reportes/nomina" + concat,
      method: "get",
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const confirmarPago = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/reportes/nomina/conf",
      method: "get",
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const genDesprendible = (cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/reportes/desprendible/" + cedula,
      method: "get",
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let NominasApi = {
  getNominas,
  confirmarPago,
  genDesprendible,
};

export default NominasApi;
