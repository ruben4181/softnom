require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addSubsidio = (payload) => {
  return new Promise((resolve, reject) => {
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let valor = payload.valor;
    let activo = parseInt(payload.activo);
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_SUBSIDIO,
          [nombre, tipo, valor, activo, cedula],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_INSERT_SUBSIDIO
            );
            conn.end();
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let updateSubsidio = (subsidioId, payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let valor = payload.valor;
    let activo = payload.activo;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_SUBSIDIO,
          [subsidioId, cedula, nombre, tipo, valor, activo],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_SUBSIDIO
            );
            conn.end();
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let searchSubsidios = (payload) => {
  return new Promise((resolve, reject) => {
    let subsidioId = payload.subsidioId;
    let cedula = payload.cedula;
    let nombre = payload.nombre;
    let tipo = payload.tipo;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_SUBSIDIOS,
          [subsidioId, cedula, nombre, tipo],
          (err, result) => {
            mysql_util.handleSearchSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_SEARCH_SUBSIDIOS
            );
            conn.end();
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let getSubsidios = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_SUBSIDIOS, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_SUBSIDIOS,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Subsidios obtenidos",
              data: result,
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let getSubsidio = (subsidioId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_SUBSIDIO, [subsidioId], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_SUBSIDIO,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Subsidios obtenidos",
              data: result,
            });
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addSubsidio,
  updateSubsidio,
  searchSubsidios,
  getSubsidios,
  getSubsidio,
};
