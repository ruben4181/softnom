require("dotenv").config({ path: ".env" });
const mysql_util = require("../connections/mysql_connection");
const sql_constants = require("./constants");

let genNomina = () => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(sql_constants.SP_GEN_NOMINA, [], (err, result) => {
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

module.exports = {
  genNomina,
  confirmarNomina,
};
