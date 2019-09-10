const path = require("path");
require("dotenv").config({
  path: path.resolve(process.cwd(), ".development.server.env"),
});
console.log(process.env.DB_CONNECTION_STRING);
const { Pool } = require("pg");
const dbPool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

const express = require("express");
const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.get("/", (req, res) => res.send("Hello world"));
server.listen(port, () => console.log(`listening on ${port}!!!`));
