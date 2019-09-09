const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".development.server.env"),
});
const { Pool } = require("pg");

console.log(process.env.DB_CONNECTION_STRING);

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
  if (err) return process.exit(1);
});

const express = require("express");
const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.get("/", (req, res) => res.send("Hello world"));
server.listen(port, () => console.log(`listening on ${port}!!!`));
