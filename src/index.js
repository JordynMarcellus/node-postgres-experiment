require("dotenv").config();
const { Pool } = require("pg");

console.log(process.env.DB_CONNECTION_STRING);

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  if (err) return process.exit(1);

  pool.end();
});

const express = require("express");
const server = express();
const port = process.NODE_APP_PORT || 3000;

server.get("/", (req, res) => res.send("Hello world"));
server.listen(port, () => console.log(`listening on ${port}!!!`));
