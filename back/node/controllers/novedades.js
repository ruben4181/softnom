require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/novedades/novedades");

app.post("/novedades", (req, res) => {
  let body = req.body;
  services
    .addNovedad(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/novedades/:novedadId", (req, res) => {
  let novedadId = req.params.novedadId;
  let body = req.body;

  services
    .updateNovedad(novedadId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/novedades/find", (req, res) => {
  let body = req.body;

  services
    .searchNovedades(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/novedades", (req, res) => {
  services
    .getNovedades()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/novedades/:novedadId", (req, res) => {
  let novedadId = req.params.novedadId;

  services
    .getNovedad(novedadId)
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
