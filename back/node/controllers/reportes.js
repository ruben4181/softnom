require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/reportes/reportes");

app.get("/reportes/nomina", (req, res) => {
  services
    .genNomina()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/reportes/nomina/conf", (req, res) => {
  services
    .confirmarNomina()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

module.exports = app;
