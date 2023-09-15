import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "35.198.40.165";
const BASE_URL = "http://" + HOST + ":8000";

const getSubsidios = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/subsidios",
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

const findSubsidios = (nombre, tipo, cedula) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/subsidios/find",
      method: "post",
      data: {
        nombre,
        tipo,
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

const getSubsidio = (subsidioId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/subsidios/" + subsidioId,
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

const updateSubsidio = (subsidioId, data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/subsidios/" + subsidioId,
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

const addSubsidio = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/subsidios/",
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

const SubsidiosApi = {
  getSubsidios,
  findSubsidios,
  getSubsidio,
  updateSubsidio,
  addSubsidio,
};

export default SubsidiosApi;
