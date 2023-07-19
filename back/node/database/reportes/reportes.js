require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let genNomina = (activo = 1) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.SP_GEN_NOMINA, [activo], (err, result) => {
          mysql_util.handleSearchSPResult(
            err,
            result,
            resolve,
            reject,
            sql_constants.SP_GEN_NOMINA
          );
          conn.end();
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

let confirmarNomina = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_CONFIRMAR_PAGO_NOMINA,
          [],
          (err, result) => {
            mysql_util.handleSPResult(
              err,
              result,
              resolve,
              reject,
              sql_constants.SP_CONFIRMAR_PAGO_NOMINA
            );
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let genDesprendible = (cedula) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SP_GEN_DESPRENDIBLE,
          [cedula],
          (err, result) => {
            if (err) {
              reject({
                result: "ERROR",
                message:
                  "Error while executing " + sql_constants.SP_GEN_DESPRENDIBLE,
                err,
              });
            } else {
              console.log(result[1]);
              let data = null;
              if (result[0][0].RESULT === "OK") {
                if (result[1]) {
                  data = result[1];
                }
                for (let i = 2; i < result.length - 1; i++) {
                  if (result[i]) {
                    data = data.concat(result[i]);
                  }
                }
              }
              resolve({
                result: result[0][0].RESULT,
                message: result[0][0].MESSAGE,
                data,
              });
              conn.end();
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
  genNomina,
  confirmarNomina,
  genDesprendible,
};
