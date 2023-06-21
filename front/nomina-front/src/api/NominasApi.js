import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "34.125.8.183";
const BASE_URL = "http://" + HOST + ":8000";

const getNominas = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/reportes/nomina",
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

let NominasApi = {
  getNominas,
  confirmarPago,
};

export default NominasApi;
