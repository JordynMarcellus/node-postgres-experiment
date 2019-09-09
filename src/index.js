require("dotenv").config();

const { Pool, Client } = require("pg");

const pool = new Pool();

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

const express = require("express");
const server = express();
const port = process.NODE_APP_ENV || 3000;

server.get("/", (req, res) => res.send("Hello world"));
server.listen(port, () => console.log(`listening on ${port}`));
