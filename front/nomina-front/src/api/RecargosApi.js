import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "35.198.40.165";
const BASE_URL = "http://" + HOST + ":8000";

const getRecargos = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/recargos",
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

const findRecargos = (recargoId, cedula, descripcion) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/recargos/find",
      method: "post",
      data: {
        recargoId,
        cedula,
        descripcion,
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

const getRecargo = (recargoId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/recargos/" + recargoId,
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

const updateRecargo = (recargoId, data) => {
  return new Promise((resolve, reject) => {
    let fecha = new Date(data.fecha);
    const formattedDate = fecha.toISOString().split("T")[0];
    data.fecha = formattedDate;
    let config = {
      url: BASE_URL + "/api/recargos/" + recargoId,
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

const addRecargo = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/recargos/",
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

const RecargosApi = {
  getRecargos,
  findRecargos,
  getRecargo,
  updateRecargo,
  addRecargo,
};

export default RecargosApi;
