require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/recargos/recargos");

app.get("/recargos", (req, res) => {
  services
    .getRecargos()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/recargos", (req, res) => {
  let body = req.body;

  services
    .addRecargo(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/recargos/:recargoId", (req, res) => {
  let body = req.body;
  let recargoId = req.params.recargoId;

  services
    .updateRecargo(recargoId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/recargos/:recargoId", (req, res) => {
  let recargoId = req.params.recargoId;

  services
    .getRecargo(recargoId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/recargos/find", (req, res) => {
  let recargoId = req.body.recargoId;
  let cedula = req.body.cedula;
  let descripcion = req.body.descripcion;

  services
    .searchRecargos(recargoId, cedula, descripcion)
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
