import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "34.125.8.183";
const BASE_URL = "http://" + HOST + ":8000";

const getPrimas = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/primas",
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

const findPrimas = (cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/primas/find",
      method: "post",
      data: {
        cedula,
      },
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

const getPrima = (primaId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/primas/" + primaId,
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

const updatePrima = (primaId, data) => {
  return new Promise((resolve, reject) => {
    let fecha = new Date(data.fecha_ingreso);
    const formattedDate = fecha.toISOString().split("T")[0];
    data.fecha = formattedDate;
    let config = {
      url: BASE_URL + "/api/primas/" + primaId,
      method: "put",
      data,
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const addPrima = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/primas/",
      method: "post",
      data,
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

const PrimasApi = {
  getPrimas,
  findPrimas,
  getPrima,
  updatePrima,
  addPrima,
};

export default PrimasApi;
