require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let addNovedad = (payload) => {
  return new Promise((resolve, reject) => {
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let fecha = payload.fecha;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_INSERT_NOVEDAD,
          [nombre, tipo, descripcion, fecha, cedula],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " + sql_constants.SP_INSERT_NOVEDAD,
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
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let updateNovedad = (novedadId, payload) => {
  return new Promise((resolve, reject) => {
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let fecha = payload.fecha;
    let cedula = payload.cedula;
    let activo = parseInt(payload.activo);

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_UPDATE_NOVEDAD,
          [novedadId, nombre, tipo, descripcion, fecha, cedula, activo],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_UPDATE_NOVEDAD
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

let searchNovedades = (payload) => {
  return new Promise((resolve, reject) => {
    let novedadId = parseInt(payload.novedadId) || null;
    let nombre = payload.nombre;
    let tipo = payload.tipo;
    let descripcion = payload.descripcion;
    let cedula = payload.cedula;

    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_SEARCH_NOVEDADES,
          [novedadId, nombre, tipo, descripcion, cedula],
          (err, result) => {
            mysql_util.handleSearchSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_SEARCH_NOVEDADES
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

let getNovedades = () => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.GET_NOVEDADES, [], (err, result) => {
        if (err) {
          reject({
            result: "ERROR",
            message: "Error while executing " + sql_constants.GET_NOVEDADES,
            err,
          });
        } else {
          resolve({
            result: "OK",
            message: "Novedades obtenidas",
            data: result,
          });
        }
        conn.end();
      });
    });
  });
};

let getNovedad = (novedadId) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.GET_NOVEDAD, [novedadId], (err, result) => {
        if (err) {
          reject({
            result: "ERROR",
            message: "Error while executing " + sql_constants.GET_NOVEDAD,
            err,
          });
        } else {
          resolve({
            result: "OK",
            message: "Novedades obtenidas",
            data: result.length > 0 ? result[0] : null,
          });
        }
        conn.end();
      });
    });
  });
};

module.exports = {
  addNovedad,
  updateNovedad,
  searchNovedades,
  getNovedades,
  getNovedad,
};
