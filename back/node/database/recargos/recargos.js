require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addRecargo = (payload) => {
  return new Promise((resolve, reject) => {
    let horas = parseInt(payload.horas);
    let valor_hora = parseInt(payload.valor_hora);
    let descripcion = payload.descripcion;
    let cedula = payload.cedula;
    let fecha = payload.fecha;

    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(
        sql_constants.SP_INSERT_RECARGO,
        [horas, valor_hora, descripcion, cedula, fecha],
        (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message:
                "Error while executing " + sql_constants.SP_INSERT_RECARGO,
              err,
            });
          } else {
            let data = null;
            if (result.length > 1) {
              data = result[1][0];
            }
            resolve({
              result: result[0][0].RESULT,
              message: result[0][0].MESSAGE,
              data,
            });
          }
          conn.end();
        }
      );
    });
  });
};

let updateRecargo = (recargoId, payload) => {
  return new Promise((resolve, reject) => {
    let horas =
      payload.horas !== null && payload.horas !== undefined
        ? parseInt(payload.horas)
        : undefined;
    let valor_hora =
      payload.valor_hora !== null && payload.valor_hora !== undefined
        ? parseInt(payload.valor_hora)
        : undefined;
    let descripcion = payload.descripcion;
    let cedula = payload.cedula;
    let activo =
      payload.activo !== null && payload.activo !== undefined
        ? parseInt(payload.activo)
        : undefined;
    let fecha = payload.fecha;
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_RECARGO,
          [recargoId, horas, valor_hora, descripcion, cedula, activo, fecha],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " + sql_constants.SP_UPDATE_RECARGO,
                err,
              });
            } else {
              let data = null;
              console.log(result[0]);
              if (result.length > 1) {
                data = result[1][0];
              }
              resolve({
                result: result[0][0].RESULT,
                message: result[0][0].MESSAGE,
                data,
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

let searchRecargos = (recargoId, cedula, descripcion) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_RECARGOS,
          [recargoId, cedula, descripcion],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " + sql_constants.SP_SEARCH_RECARGOS,
                err,
              });
            } else {
              resolve({
                result: "OK",
                message: "Recargos obtenidos en la busqueda",
                data: result[0],
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

let getRecargos = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_RECARGOS, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_RECARGOS,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Recargos obtenidos",
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

let getRecargo = (recargoId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_RECARGO, [recargoId], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_RECARGO,
              err,
            });
          } else {
            if (result.length > 0) {
              resolve({
                result: "OK",
                message: "Recargo encontrado",
                data: result[0],
              });
            } else {
              resolve({
                result: "FAIL",
                message: "Recargo NO encontrado",
              });
            }
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addRecargo,
  updateRecargo,
  getRecargos,
  searchRecargos,
  getRecargo,
};
