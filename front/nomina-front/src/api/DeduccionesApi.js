import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "34.125.8.183";
const BASE_URL = "http://" + HOST + ":8000";

const getDeducciones = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/deducciones",
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

const findDeducciones = (nombre, tipo, descripcion, cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/deducciones/find",
      method: "post",
      data: {
        nombre,
        tipo,
        descripcion,
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

const getDeduccion = (deduccionId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/deducciones/" + deduccionId,
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

const updateDeduccion = (deduccionId, data) => {
  return new Promise((resolve, reject) => {
    let fecha = new Date(data.fecha);
    const formattedDate = fecha.toISOString().split("T")[0];
    data.fecha = formattedDate;
    let config = {
      url: BASE_URL + "/api/deducciones/" + deduccionId,
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

const addDeduccion = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/deducciones/",
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

const DeduccionesApi = {
  getDeducciones,
  findDeducciones,
  getDeduccion,
  updateDeduccion,
  addDeduccion,
};

export default DeduccionesApi;
