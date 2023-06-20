require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let authUser = (email, password) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_USUARIOS_AUTH,
          [email, password],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message: "Error al consultar " + sql_constants.SP_USUARIOS_AUTH,
                err,
              });
            } else {
              var data;
              if (result.length > 1) {
                data = result[1][0];
                if (result.length > 2) {
                  data["roles"] = result[2];
                }
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
        console.log(err);
        reject(err);
      });
  });
};

let createUser = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        let name = payload.name;
        let email = payload.email;
        let phone = payload.phone;
        let password = payload.password;
        let activo = parseInt(payload.activo);
        let cedula = payload.cedula;
        let area = payload.area;
        let cargo = payload.cargo;
        let sueldoBasico = parseInt(payload.sueldo_basico);
        let condicion = payload.condicion;
        let estado = payload.estado;

        conn.query(
          sql_constants.SP_INSERT_USUARIO,
          [
            name,
            email,
            phone,
            password,
            activo,
            cedula,
            area,
            cargo,
            sueldoBasico,
            condicion,
            estado,
          ],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error al consultar " + sql_constants.SP_INSERT_USUARIO,
                err,
              });
            } else {
              if (result[0][0]) {
                resolve({
                  result: result[0][0].RESULT,
                  message: result[0][0].MESSAGE,
                  data: result[1][0],
                });
              }
            }
            conn.end();
          }
        );
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

let updateUser = (usuarioId, payload) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        let name = payload.name;
        let phone = payload.phone;
        let password = payload.password;
        let area = payload.area;
        let cargo = payload.cargo;
        let sueldoBasico = parseInt(payload.sueldo_basico);
        let condicion = payload.condicion;
        let estado = payload.estado;
        let activo = parseInt(payload.activo);

        conn.query(
          sql_constants.SP_UPDATE_USUARIO,
          [
            usuarioId,
            name,
            phone,
            password,
            area,
            cargo,
            sueldoBasico,
            condicion,
            estado,
            activo,
          ],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message: "Error while executing " + SP_UPDATE_USUARIO,
                err,
              });
            } else {
              resolve({
                result: result[0][0].RESULT,
                message: result[0][0].MESSAGE,
                data: result[1][0],
              });
            }
            conn.end();
          }
        );
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

let getUser = (usuarioId) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_USUARIO, [usuarioId], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + sql_constants.GET_USUARIO,
              err,
            });
          } else {
            if (result && result.length > 0) {
              let data = result[0];
              resolve({
                result: "OK",
                message: "Usuario encontrado",
                data,
              });
            } else {
              resolve({
                result: "FAIL",
                message: "Usuario no encontrado",
              });
            }
          }
          conn.end();
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

let getUsers = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.GET_USUARIOS, [], (err, result) => {
          if (err) {
            reject({
              result: "ERROR",
              message: "Error while executing " + GET_USUARIOS,
              err,
            });
          } else {
            resolve({
              result: "OK",
              message: "Usuarios encontrados",
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

let searchUser = (cedula, name, area) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_USUARIOS_GET_MATCHING,
          [cedula, name, area],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " +
                  sql_constants.SP_USUARIOS_GET_MATCHING,
                err,
              });
            } else {
              console.log(result);
              resolve({
                result: "OK",
                message: "Busqueda realizada",
                data: result[0],
              });
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

module.exports = {
  createUser,
  authUser,
  updateUser,
  getUser,
  getUsers,
  searchUser,
};
