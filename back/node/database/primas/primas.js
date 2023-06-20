require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addPrima = (payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let tipo = payload.tipo;
    let fecha_ingreso = payload.fecha_ingreso;
    let valor_total = payload.valor_total;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_PRIMA,
          [cedula, tipo, fecha_ingreso, valor_total],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_INSERT_PRIMA
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

let updatePrima = (primaId, payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let tipo = payload.tipo;
    let fecha_ingreso = payload.fecha_ingreso;
    let valor_total = payload.valor_total;
    let activo = payload.activo;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_PRIMA,
          [primaId, cedula, tipo, fecha_ingreso, valor_total, activo],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_PRIMA
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

let searchPrima = (payload) => {
  return new Promise((resolve, reject) => {
    let primaId = payload.primaId;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_PRIMA,
          [primaId, cedula],
          (err, result) => {
            mysql_util.handleSearchSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_SEARCH_PRIMA
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

let getPrimas = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_PRIMAS, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_PRIMAS,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Primas obtenidas",
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

let getPrima = (primaId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_PRIMA, [primaId], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_PRIMA,
              err,
            });
          } else {
            let data = null;
            if (result.length > 0) {
              data = result[0];
            }
            resolve({
              result: "OK",
              message: "Primas obtenidas",
              data,
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
  addPrima,
  updatePrima,
  searchPrima,
  getPrimas,
  getPrima,
};
