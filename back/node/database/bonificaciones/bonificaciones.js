require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addBonificacion = (payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let fecha = payload.fecha;
    let dias = payload.dias;
    let valor_total = payload.valor_total;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_BONIFICACION,
          [cedula, fecha, dias, valor_total],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_INSERT_BONIFICACION
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

let updateBonificacion = (beneficioId, payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let fecha = payload.fecha;
    let dias = payload.dias;
    let valor_total = payload.valor_total;
    let activo = payload.activo;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_BONIFICACION,
          [beneficioId, cedula, fecha, dias, valor_total, activo],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_BONIFICACION
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

let searchBonificacion = (payload) => {
  return new Promise((resolve, reject) => {
    let cedula = payload.cedula;
    let bonificacionId = payload.bonificacionId;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_BONIFICACIONES,
          [bonificacionId, cedula],
          (err, result) => {
            mysql_util.handleSearchSPResult(err, result, resolve, reject);
            conn.end();
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let getBonificaciones = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_BONIFICACIONES, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message:
                "Error while executing" + sql_constants.GET_BONIFICACIONES,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Bonificaciones obtenidas",
              data: result,
            });
          }
          conn.end();
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let getBonificacion = (bonificacionId) => {
  return new Promise((resolve, reject) => {
    bonificacionId = parseInt(bonificacionId);

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.GET_BONIFICACION,
          [bonificacionId],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing" + sql_constants.GET_BONIFICACION,
                err,
              });
            } else {
              resolve({
                result: "OK",
                message: "Bonificaciones obtenidas",
                data: result.length > 0 ? result[0] : null,
              });
            }
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
  addBonificacion,
  updateBonificacion,
  searchBonificacion,
  getBonificaciones,
  getBonificacion,
};
