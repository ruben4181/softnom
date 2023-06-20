require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const services = require("../database/users/users");

app.post("/auth", (req, res) => {
  let body = req.body;
  let email = body.email;
  let password = body.password;

  services
    .authUser(email, password)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/usuarios", (req, res) => {
  let body = req.body;
  services
    .createUser(body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.put("/usuarios/:usuarioId", (req, res) => {
  let usuarioId = parseInt(req.params.usuarioId);
  let body = req.body;

  services
    .updateUser(usuarioId, body)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/usuarios/:usuarioId", (req, res) => {
  let usuarioId = parseInt(req.params.usuarioId);

  services
    .getUser(usuarioId)
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/usuarios", (req, res) => {
  services
    .getUsers()
    .then((resp) => {
      res.status(200);
      res.send(resp);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.post("/usuarios/find", (req, res) => {
  let body = req.body;
  let cedula = body.cedula || null;
  let area = body.area || null;
  let name = body.name || null;

  console.log(cedula, area, name);

  services
    .searchUser(cedula, name, area)
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
