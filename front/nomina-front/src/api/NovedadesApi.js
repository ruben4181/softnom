import axios from "axios";
const HOST = process.env.HOST || "localhost";
const BASE_URL = "http://" + HOST + ":8000";

const getNovedades = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/novedades",
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

const findNovedades = (nombre, tipo, descripcion, cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/novedades/find",
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

const getNovedad = (novedadId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/novedades/" + novedadId,
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

const updateNovedad = (novedadId, data) => {
  return new Promise((resolve, reject) => {
    let fecha = new Date(data.fecha);
    const formattedDate = fecha.toISOString().split("T")[0];
    data.fecha = formattedDate;
    let config = {
      url: BASE_URL + "/api/novedades/" + novedadId,
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

const addNovedad = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/novedades/",
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

const NovedadesApi = {
  getNovedades,
  findNovedades,
  getNovedad,
  updateNovedad,
  addNovedad,
};

export default NovedadesApi;
