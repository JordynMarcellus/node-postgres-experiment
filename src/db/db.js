const { Pool } = require("pg");
const dbPool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

// this could be a heartbeat/health-check endpoint?
dbPool.connect((err, client, release) => {
  if (err) {
    console.log("client connection issue", err.stack);
  }
  console.log("successfuly connection");
  release();
});

exports.dbConnector = dbPool;
