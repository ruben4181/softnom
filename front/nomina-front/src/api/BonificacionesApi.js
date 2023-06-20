import axios from "axios";
const HOST = process.env.HOST_GC || "localhost";
const BASE_URL = "http://" + HOST + ":8000";

const getBonificaciones = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/bonificaciones",
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

const findBonificaciones = (cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/bonificaciones/find",
      method: "post",
      data: {
        cedula,
      },
    };

    axios(config)
      .then((resp) => {
        console.log("here i am", resp.data);
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getBonificacion = (bonificacionId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/bonificaciones/" + bonificacionId,
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

const updateBonificacion = (bonificacionId, data) => {
  return new Promise((resolve, reject) => {
    let fecha = new Date(data.fecha);
    const formattedDate = fecha.toISOString().split("T")[0];
    data.fecha = formattedDate;
    let config = {
      url: BASE_URL + "/api/bonificaciones/" + bonificacionId,
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

const addBonificacion = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/bonificaciones/",
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

const BonificacionesApi = {
  getBonificaciones,
  findBonificaciones,
  getBonificacion,
  updateBonificacion,
  addBonificacion,
};

export default BonificacionesApi;
