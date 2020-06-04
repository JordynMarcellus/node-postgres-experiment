const { Pool } = require("pg");
const dbPool = new Pool();

// this could be a heartbeat/health-check endpoint?
dbPool.connect((err, client, release) => {
  if (err) {
    console.log("client connection issue", err.stack);
  } else {
    console.log("successful connection");
    release();
  }
});

exports.dbConnector = dbPool;
