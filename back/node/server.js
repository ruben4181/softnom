require("dotenv").config({ path: ".env" });

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");

let server = http.createServer(app);

app.use(cors({ origin: true, credentials: true, allowedHeaders: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://34.125.8.183:3000"],
  })
);
//Indexing the routes
app.use(require("./routes/index"));

const PORT = 8000;

server.listen(PORT, () => {
  console.log("Running server at port " + PORT);
});
