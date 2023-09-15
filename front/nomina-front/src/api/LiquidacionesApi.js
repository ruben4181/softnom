import axios from "axios";
const HOST = process.env.REACT_APP_HOST_GC || "35.198.40.165";
const BASE_URL = "http://" + HOST + ":8000";

const getLiquidaciones = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/liquidaciones",
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

const findLiquidaciones = (cedula, dependencia) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/liquidaciones/find",
      method: "post",
      data: {
        cedula,
        dependencia,
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

const getLiquidacion = (liquidacionId) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/liquidaciones/" + liquidacionId,
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

const updateLiquidacion = (liquidacionId, data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/liquidaciones/" + liquidacionId,
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

const addLiquidacion = (data) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/liquidaciones/",
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

const LiquidacionesApi = {
  getLiquidaciones,
  findLiquidaciones,
  getLiquidacion,
  updateLiquidacion,
  addLiquidacion,
};

export default LiquidacionesApi;
