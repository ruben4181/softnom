require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/primas/primas");

app.get("/primas", (req, res) => {
  services
    .getPrimas()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/primas/:primaId", (req, res) => {
  let primaId = req.params.primaId;
  services
    .getPrima(primaId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/primas", (req, res) => {
  let body = req.body;
  services
    .addPrima(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/primas/:primaId", (req, res) => {
  let body = req.body;
  let primaId = parseInt(req.params.primaId);
  services
    .updatePrima(primaId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/primas/find", (req, res) => {
  let body = req.body;

  services
    .searchPrima(body)
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
