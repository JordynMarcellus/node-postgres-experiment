const { Pool } = require("pg");
const dbPool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});

export default dbPool;
