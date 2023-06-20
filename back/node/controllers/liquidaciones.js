require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/liquidaciones/liquidaciones");

app.get("/liquidaciones", (req, res) => {
  services
    .getLiquidaciones()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/liquidaciones/:liquidacionId", (req, res) => {
  let liquidacionId = req.params.liquidacionId;

  services
    .getLiquidacion(liquidacionId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/liquidaciones", (req, res) => {
  let body = req.body;

  services
    .addLiquidacion(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/liquidaciones/:liquidacionId", (req, res) => {
  let liquidacionId = req.params.liquidacionId;
  let body = req.body;

  services
    .updateLiquidacion(liquidacionId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/liquidaciones/find", (req, res) => {
  let body = req.body;

  services
    .searchLiquidaciones(body)
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
