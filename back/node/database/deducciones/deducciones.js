require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addDeduccion = (payload) => {
  return new Promise((resolve, reject) => {
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let valor_total = parseInt(payload.valor_total);
    let fecha = payload.fecha;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_DEDUCCION,
          [nombre, tipo, descripcion, valor_total, fecha, cedula],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_INSERT_DEDUCCION
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

let updateDeduccion = (deduccionId, payload) => {
  return new Promise((resolve, reject) => {
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let valor_total = parseInt(payload.valor_total);
    let fecha = payload.fecha;
    let cedula = payload.cedula;
    let activo = parseInt(payload.activo);

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_DEDUCCION,
          [
            deduccionId,
            nombre,
            tipo,
            descripcion,
            valor_total,
            fecha,
            cedula,
            activo,
          ],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_DEDUCCION
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

let searchDeduccion = (payload) => {
  return new Promise((resolve, reject) => {
    let deduccionId = parseInt(payload.deduccionId) || null;
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_DEDUCCIONES,
          [deduccionId, nombre, tipo, descripcion, cedula],
          (err, restult) => {
            mysql_util.handleSearchSPResult(
              err,
              restult,
              resolve,
              reject,
              sql_constants.SP_SEARCH_DEDUCCIONES
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

let getDeducciones = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_DEDUCCIONES, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_DEDUCCIONES,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Deducciones obtenidas",
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

let getDeduccion = (deduccionId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.GET_DEDUCCION,
          [deduccionId],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message: "Error while executing " + sql_constants.GET_DEDUCCION,
                err,
              });
            } else {
              resolve({
                result: "OK",
                message: "Deducciones obtenidas",
                data: result.length > 0 ? result[0] : null,
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

module.exports = {
  addDeduccion,
  updateDeduccion,
  searchDeduccion,
  getDeducciones,
  getDeduccion,
};
