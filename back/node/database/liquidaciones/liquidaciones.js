require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let getLiquidaciones = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_LIQUIDACIONES, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message:
                "Error while executing " + sql_constants.GET_LIQUIDACIONES,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Liquidaciones obtenidos",
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

let getLiquidacion = (liquidacionId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.GET_LIQUIDACION,
          [liquidacionId],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " + sql_constants.GET_LIQUIDACION,
                err,
              });
            } else {
              resolve({
                result: "OK",
                message: "Liquidacion obtenida",
                data: result,
              });
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let addLiquidacion = (payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let dependencia = payload.dependencia;
    let valor = payload.valor;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_LIQUIDACION,
          [cedula, dependencia, valor],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_INSERT_LIQUIDACION
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

const updateLiquidacion = (liquidacionId, payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let dependencia = payload.dependencia;
    let activo = payload.activo;
    let valor = payload.valor;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_LIQUIDACION,
          [liquidacionId, cedula, dependencia, activo, valor],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_LIQUIDACION
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

const searchLiquidaciones = (payload) => {
  return new Promise((resolve, reject) => {
    let liquidacionId = payload.liquidacionId;
    let dependencia = payload.dependencia;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_LIQUIDACION,
          [liquidacionId, dependencia, cedula],
          (err, result) => {
            mysql_util.handleSearchSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_SEARCH_LIQUIDACION
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

module.exports = {
  getLiquidaciones,
  getLiquidacion,
  addLiquidacion,
  updateLiquidacion,
  searchLiquidaciones,
};
