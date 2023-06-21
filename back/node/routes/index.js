const express = require("express");
const app = express();

app.use("/api/", require("../controllers/users"));
app.use("/api/", require("../controllers/recargos"));
app.use("/api/", require("../controllers/novedades"));
app.use("/api/", require("../controllers/deduccion"));
app.use("/api/", require("../controllers/bonificaciones"));
app.use("/api/", require("../controllers/primas"));
app.use("/api/", require("../controllers/subsidios"));
app.use("/api/", require("../controllers/liquidaciones"));
app.use("/api/", require("../controllers/reportes"));

module.exports = app;
