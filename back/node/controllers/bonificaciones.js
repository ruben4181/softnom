require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/bonificaciones/bonificaciones");

app.post("/bonificaciones", (req, res) => {
  let body = req.body;

  services
    .addBonificacion(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(200);
      res.send(err);
    });
});

app.put("/bonificaciones/:bonificacionId", (req, res) => {
  let bonificacionId = req.params.bonificacionId;
  let body = req.body;

  services
    .updateBonificacion(bonificacionId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/bonificaciones", (req, res) => {
  services
    .getBonificaciones()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/bonificaciones/:bonificacionId", (req, res) => {
  let bonificacionId = req.params.bonificacionId;

  services
    .getBonificacion(bonificacionId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/bonificaciones/find", (req, res) => {
  let body = req.body;

  services
    .searchBonificacion(body)
    .then((resp) => {
      res.send(200);
      res.status(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

module.exports = app;
