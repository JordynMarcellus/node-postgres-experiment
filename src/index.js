const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".development.server.env"),
});
const { Pool } = require("pg");

let pool = null;
console.log(process.env.DB_CONNECTION_STRING);
while (pool === null) {
  try {
    const tempPool = new Pool({
      connectionString: process.env.DB_CONNECTION_STRING,
    });
    const query = tempPool.query("SELECT NOW()", (err, res) => {
      console.log(err, res);
      pool.end();
      if (err) return err;
      console.log(res);
      return res;
    });
    pool = tempPool;
    break;
  } catch (err) {
    console.error(err);
  }
}

// const pool = new Pool({
//   connectionString: process.env.DB_CONNECTION_STRING,
// });

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
//   if (err) return process.exit(1);
// });

const express = require("express");
const server = express();
const port = process.env.NODE_APP_PORT || 3000;

server.get("/", (req, res) => res.send("Hello world"));
server.listen(port, () => console.log(`listening on ${port}!!!`));
