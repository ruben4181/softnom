require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/deducciones/deducciones");

app.get("/deducciones", (req, res) => {
  services
    .getDeducciones()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/deducciones/:deduccionId", (req, res) => {
  let deduccionId = req.params.deduccionId;

  services
    .getDeduccion(deduccionId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/deducciones", (req, res) => {
  let body = req.body;

  services
    .addDeduccion(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/deducciones/:deduccionId", (req, res) => {
  let deduccionId = req.params.deduccionId;
  let body = req.body;

  services
    .updateDeduccion(deduccionId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/deducciones/find", (req, res) => {
  let body = req.body;
  services
    .searchDeduccion(body)
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
