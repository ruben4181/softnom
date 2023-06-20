require("dotenv").config({ path: ".env" });
/*
  CREATE A CONNECTION TO TIENDAPP MYSQL DATABASE
*/

var mysql = require("mysql");
let getConnection = function () {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: process.env.DATABASE_SQL_HOST,
      database: process.env.DATABASE_SQL_DBNAME,
      user: process.env.DATABASE_SQL_USER,
      password: process.env.DATABASE_SQL_PASSWORD,
      multipleStatements: true,
      multipleResults: true,
    });

    connection.connect(function (err) {
      if (err) {
        console.error("Error connecting222: " + err.stack);
        console.log("----------------------");
        console.log(err);
        reject({
          err,
        });
      }
      resolve(connection);
    });
  });
};

let handleSPResult = (err, result, resolve, reject, sp) => {
  if (err) {
    reject({
      result: "ERROR",
      message: "Error while executing " + sp,
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
};

let handleSearchSPResult = (err, result, resolve, reject, sp) => {
  if (err) {
    reject({
      result: "ERROR",
      message: "Error while executing " + sp,
      err,
    });
  } else {
    resolve({
      result: "OK",
      message: "Datos obtenidos",
      data: result[0],
    });
  }
};

module.exports = {
  getConnection,
  handleSPResult,
  handleSearchSPResult,
};
