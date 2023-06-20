require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/subsidios/subsidios");

app.get("/subsidios", (req, res) => {
  services
    .getSubsidios()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/subsidios/:subsidioId", (req, res) => {
  let subsidioId = req.params.subsidioId;

  services
    .getSubsidio(subsidioId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/subsidios", (req, res) => {
  let body = req.body;

  services
    .addSubsidio(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/subsidios/:subsidioId", (req, res) => {
  let body = req.body;
  let subsidioId = req.params.subsidioId;

  services
    .updateSubsidio(subsidioId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/subsidios/find", (req, res) => {
  let body = req.body;

  services
    .searchSubsidios(body)
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
